const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const taskTable = db.collection('lcg-task-config')
const taskListTable = db.collection('lcg-task-list')
const { getUserInfo, getUserInfoByName } = require('lcg-common')
const userObj = uniCloud.importObject('lcg-user')

// 任务信息检查
const taskInfoCheck = params => {
	const ret = { success: true, errMsg: '' }
	if (!/^\+?[1-9]\d*$/.test(params.reward)) return Object.assign(ret, { success: false, errMsg: '积分只能是正整数！' })
	if (params.execute_type === 1 && !/^\+?[1-9]\d*$/.test(params.execute_days)) return Object.assign(ret, { success: false, errMsg: '执行天数只能是正整数！' })
	return ret
}

/* 获取任务列表 */
const get = async function (userInfo) {
	const ret = { success: true, errMsg: '' }
	let creator = userInfo.username
	// 查询账号信息
	const { isParent, user } = await getUserInfo(userInfo._id)
	let { parent_id } = user
	// 子账号，查询的是家长账号的任务列表
	if (!isParent) {
		const { user: parent } = await getUserInfo(parent_id)
		creator = parent.username
	}
	// 查询任务列表
	const taskListTable = taskTable.where({ creator })
	let { data: userTaskList } = await taskListTable.get()
	ret.data = { userTaskList }
	return ret
}
/* 创建任务 */
const create_task = async function (userInfo, params) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 校验任务信息
	const checkInfo = taskInfoCheck(params)
	if (!checkInfo.success) return Object.assign(ret, checkInfo)
	const data = {
		...params,
		reward: Number(params.reward),
		execute_days: Number(params.execute_days),
		creator: userDetail.user.username
	}

	await taskTable.add(data)
	return ret
}
/* 编辑任务列表 */
const edit_task = async function (userInfo, id, params) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 校验任务信息
	const checkInfo = taskInfoCheck(params)
	if (!checkInfo.success) return Object.assign(ret, checkInfo)
	const data = {
		...params,
		reward: Number(params.reward),
		execute_days: Number(params.execute_days)
	}
	const taskDetail = taskTable.where({ _id: id })
	const { updated } = await taskDetail.update(data)
	if (updated === 0) return Object.assign(ret, { success: false, errMsg: '修改失败！' })
	return ret
}
/* 删除任务 */
const detele_task = async function (userInfo, id) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 从任务列表中删除已发布的任务
	const taskListTableById = taskListTable.where({ task_id: id })
	const { deleted: del } = await taskListTableById.remove()
	if (del === 0) return Object.assign(ret, { success: false, errMsg: '任务列表删除失败！' })
	// 删除任务信息
	const taskDetail = taskTable.where({ _id: id })
	const { deleted } = await taskDetail.remove()
	if (deleted === 0) return Object.assign(ret, { success: false, errMsg: '删除失败！' })
	return ret
}
/* 分发任务 */
const dispense_task = async function (userInfo, id, params) {
	const ret = { success: true, errMsg: '' }
	const { child } = params
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 检查孩子是否是当前用户下的子账号
	const { user } = userDetail
	const { children } = user
	if (Array.isArray(children)) {
		if (!children.includes(child)) return Object.assign(ret, { success: false, errMsg: '不是当前用户下的子账号' })
	} else {
		return Object.assign(ret, { success: false, errMsg: '不是当前用户下的子账号' })
	}
	const data = {
		execute_name: child,
		dispense_name: user.username,
		dispense_nickname: user.nickname,
		task_id: id,
		state: 1 // 任务开始状态
	}
	// 添加任务到列表
	await taskListTable.add(data)
	return ret
}
/* 子账号领取任务 */
const take_task = async function (userInfo, id) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是子账号！' })
	const { user } = userDetail
	const data = {
		execute_name: user.username,
		dispense_name: user.username,
		dispense_nickname: user.nickname,
		task_id: id,
		state: 1 // 任务开始状态
	}
	// 添加任务到列表
	await taskListTable.add(data)
	return ret
}
/* 获取执行任务列表 */
const getTaskList = async function (userInfo, username) {
	const ret = { success: true, errMsg: '' }
	let __username = userInfo.username
	// 查询账号信息
	const { isParent, user } = await getUserInfo(userInfo._id)
	let { parent_id } = user
	// 子账号，查询的是家长账号的配置
	if (!isParent) {
		const { user } = await getUserInfo(parent_id)
		__username = user.username
	}
	// 家长下的任务, 主表临时表
	const dbJQL = uniCloud.databaseForJQL({
		clientInfo: this.getClientInfo()
	})
	const taskTemp = dbJQL.collection('lcg-task-config').where({ creator: __username }).getTemp()
	// 获取任务列表
	const { data: taskList } = await dbJQL
		.collection('lcg-task-list', taskTemp)
		.where({ execute_name: username, state: dbCmd.in([1, 2]) })
		.get()
	ret.data = taskList.map(({ dispense_nickname, state, _id, task_id }) => ({
		_id,
		state,
		dispense_nickname,
		task_name: task_id[0].name,
		reward: task_id[0].reward,
		icon: task_id[0].icon,
		icon_color: task_id[0].icon_color,
		task_type: task_id[0].task_type,
		execute_type: task_id[0].execute_type,
		execute_days: task_id[0].execute_days,
		execute_weeks: task_id[0].execute_weeks
	}))
	return ret
}
/* 更新任务状态 */
const update_task_state = async function (userInfo, id, state) {
	const ret = { success: true, errMsg: '' }
	// 更新状态
	const taskListTableById = taskListTable.where({ _id: id })
	const { updated } = await taskListTableById.update({ state })
	if (updated === 0) return Object.assign(ret, { success: false, errMsg: '状态修改失败！' })
	return ret
}
/*子账号提交任务 */
const submit_task = async function (userInfo, id) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是子账号！' })
	// 修改状态为已提交
	const updateRet = await update_task_state(userInfo, id, 2)
	if (!updateRet.success) return Object.assign(ret, updateRet)
	return ret
}

/* 任务标记完成 */
const complete_task = async function (userInfo, id, username) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 查询任务信息
	const taskListTableById = taskListTable.where({ _id: id })
	const { data: taskInfos } = await taskListTableById.get()
	const { task_id } = taskInfos[0]
	const { data: taskConfigs } = await taskTable.where({ _id: task_id }).get()
	const { reward } = taskConfigs[0]
	// 修改子账号积分
	const editRet = await userObj.editChildScore(userInfo, { username, score: reward, type: 'add', notes: '完成任务！' })
	if (!editRet.success) return Object.assign(ret, editRet)
	// 修改状态为完成
	const updateRet = await update_task_state(userInfo, id, 3)
	if (!updateRet.success) return Object.assign(ret, updateRet)
	return ret
}
/* 取消任务 */
const cancel_task = async function (userInfo, id) {
	const ret = { success: true, errMsg: '' }
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 删除任务
	const taskListTableById = taskListTable.where({ _id: id })
	const { deleted } = await taskListTableById.remove()
	if (deleted === 0) return Object.assign(ret, { success: false, errMsg: '取消失败！' })
	return ret
}
module.exports = {
	get,
	cancel_task,
	complete_task,
	getTaskList,
	dispense_task,
	submit_task,
	take_task,
	create_task,
	edit_task,
	detele_task
}
