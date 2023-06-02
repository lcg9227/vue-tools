const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const configTable = db.collection('lcg-users-config')

module.exports = {
	/* 获取配置 */
	get: async function (userInfo) {
		const ret = {
			success: true,
			errMsg: ''
		}
		let __uid = userInfo._id
		// 查询账号信息
		const parentTable = usersTable.where({ _id: userInfo._id }).limit(1)
		const { data: users } = await parentTable.get()
		const user = users[0]
		let { role, parent_id } = user
		// 子账号，查询的是家长账号的配置
		if (!role.includes('parent')) {
			__uid = parent_id
		}
		// 查询配置
		let { data: userConfigs } = await configTable.where({ user_id: __uid }).limit(1).get()
		// 判断是否存在配置, 不存在则创建配置
		if (userConfigs.length <= 0) {
			// 添加时用jql方式添加，可以获取默认值
			const dbJQL = uniCloud.databaseForJQL({
				clientInfo: this.getClientInfo()
			})
			await dbJQL.collection('lcg-users-config').add({ user_id: __uid })
			const newConfig = await configTable.where({ user_id: __uid }).limit(1).get()
			userConfigs = newConfig.data
		}
		ret.data = userConfigs[0]
		return ret
	}
}
