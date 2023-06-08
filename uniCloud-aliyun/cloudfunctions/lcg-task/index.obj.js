const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const taskTable = db.collection('lcg-task-config')
const taskListTable = db.collection('lcg-task-list')
const { getUserInfo } = require('lcg-common')

// 任务信息检查
const taskInfoCheck = params => {
	const ret = {
		success: true,
		errMsg: ''
	}
	if (!/^\+?[1-9]\d*$/.test(params.reward)) return Object.assign(ret, { success: false, errMsg: '积分只能是正整数！' })
	if (params.execute_type === 1 && !/^\+?[1-9]\d*$/.test(params.execute_days)) return Object.assign(ret, { success: false, errMsg: '执行天数只能是正整数！' })
	return ret
}

/* 获取任务列表 */
const get = async function (userInfo) {
	const ret = {
		success: true,
		errMsg: ''
	}
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
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 校验任务信息
	const checkInfo = taskInfoCheck(params)
	if (checkInfo.success) return Object.assign(ret, checkInfo)
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
	const ret = {
		success: true,
		errMsg: ''
	}
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
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
	// 从任务列表中删除已发布的任务
	const taskListTableById = await taskListTable.where({ task_id: id })
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
	const ret = {
		success: true,
		errMsg: ''
	}
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
/* 获取执行任务列表 */
const getTaskList = async function (userInfo, username) {
	const ret = {
		success: true,
		errMsg: ''
	}
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
	const { data: taskList } = await dbJQL.collection('lcg-task-list', taskTemp).where({ execute_name: username }).get()
	ret.data = taskList
	return ret
}
module.exports = {
	get,
	getTaskList,
	dispense_task,
	create_task,
	edit_task,
	detele_task
}
