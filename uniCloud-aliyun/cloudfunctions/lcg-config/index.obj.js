const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const configTable = db.collection('lcg-users-config')
const { getUserInfo } = require('lcg-common') // todo

/* 获取配置 */
const get = async function (userInfo, type) {
	const ret = {
		success: true,
		errMsg: ''
	}
	let __uid = userInfo._id
	// 查询账号信息
	const { isParent, user } = await getUserInfo(userInfo._id)
	let { parent_id } = user
	// 子账号，查询的是家长账号的配置
	if (!isParent) {
		__uid = parent_id
	}
	// 查询配置
	const userConfigTable = configTable.where({ user_id: __uid }).limit(1)
	let { data: userConfigs } = await userConfigTable.get()
	// 判断是否存在配置, 不存在则创建配置
	if (userConfigs.length <= 0) {
		// 添加时用jql方式添加，可以获取默认值
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})
		await dbJQL.collection('lcg-users-config').add({ user_id: __uid })
		const newConfig = await userConfigTable.get()
		userConfigs = newConfig.data
	}
	ret.data = userConfigs[0]
	if (type === 'self') {
		ret.userConfigTable = userConfigTable
	}
	return ret
}
/* 添加积分等级配置 */
const add_score_level = async function (userInfo, params) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const { isParent } = await getUserInfo(userInfo._id)
	if (!isParent) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
	// limit 校验
	const isInt = /^(?:0|(?:-?[1-9]\d*))$/.test(params.limit)
	if (!params.limit || !isInt) return Object.assign(ret, { success: false, errMsg: '积分只能输入整数！' })
	// 获取配置
	const { data, userConfigTable } = await get(userInfo, 'self')
	let score_level = JSON.parse(JSON.stringify(data.score_level))
	// 添加配置
	score_level.push({ limit: parseInt(params.limit) })
	// 排序
	score_level.sort((a, b) => a.limit - b.limit)
	score_level.forEach((v, i) => {
		v.text = `lv:${i + 1}`
	})
	// 写入数据库
	const { updated } = await userConfigTable.update({ score_level })
	if (updated === 0) return Object.assign(ret, { success: false, errMsg: '添加失败！' })
	return ret
}
/* 修改积分配置 */
const edit_score_level = async function (userInfo, params, index) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const { isParent } = await getUserInfo(userInfo._id)
	if (!isParent) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
	// limit 校验
	const isInt = /^(?:0|(?:-?[1-9]\d*))$/.test(params.limit)
	if (!params.limit || !isInt) return Object.assign(ret, { success: false, errMsg: '积分只能输入整数！' })
	// 获取配置
	const { data, userConfigTable } = await get(userInfo, 'self')
	let score_level = JSON.parse(JSON.stringify(data.score_level))
	// 修改配置
	score_level[index].limit = parseInt(params.limit)
	// 排序
	score_level.sort((a, b) => a.limit - b.limit)
	score_level.forEach((v, i) => {
		v.text = `lv:${i + 1}`
	})
	// 写入数据库
	const { updated } = await userConfigTable.update({ score_level })
	if (updated === 0) return Object.assign(ret, { success: false, errMsg: '修改失败！' })
	return ret
}
/* 删除积分配置 */
const del_score_level = async function (userInfo, index) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const { isParent } = await getUserInfo(userInfo._id)
	if (!isParent) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
	// 获取配置
	const { data, userConfigTable } = await get(userInfo, 'self')
	let score_level = JSON.parse(JSON.stringify(data.score_level))
	// 修改配置
	score_level.splice(index, 1)
	score_level.forEach((v, i) => {
		v.text = `lv:${i + 1}`
	})
	// 写入数据库
	const { updated } = await userConfigTable.update({ score_level })
	if (updated === 0) return Object.assign(ret, { success: false, errMsg: '删除失败！' })
	return ret
}

module.exports = {
	get,
	add_score_level,
	edit_score_level,
	del_score_level
}
