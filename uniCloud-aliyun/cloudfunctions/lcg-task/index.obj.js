const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const taskTable = db.collection('lcg-task-config')
const { getUserInfo } = require('lcg-common')

/* 创建任务 */
const create_task = async function (userInfo, params) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const userDetail = await getUserInfo(userInfo._id)
	if (!userDetail.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })

	if (!/^\+?[1-9]\d*$/.test(params.reward)) return Object.assign(ret, { success: false, errMsg: '积分只能是正整数！' })
	if (!/^\+?[1-9]\d*$/.test(params.execute_days)) return Object.assign(ret, { success: false, errMsg: '执行天数只能是正整数！' })

	const data = {
		...params,
		reward: Number(params.reward),
		execute_days: Number(params.execute_days),
		creator: userDetail.user.username
	}
	await taskTable.add(data)
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
	const taskListTable = taskTable.where({ creator }).limit(1)
	let { data: userTaskList } = await taskListTable.get()
	ret.data = { userTaskList }
	return ret
}
module.exports = {
	get,
	create_task
}
