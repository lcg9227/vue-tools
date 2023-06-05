const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const { getUserInfo } = require('lcg-common')

module.exports = {
	/* 获取账号详细信息 */
	getDetail: async function (userInfo) {
		const ret = {
			success: true,
			errMsg: ''
		}
		const { user } = await getUserInfo(userInfo._id)
		const { nickname, avatar_file, score } = user
		ret.data = { nickname, avatar_file, score }
		return ret
	},
	/* 添加子账号 */
	addChlid: async function (userInfo, childName) {
		const ret = {
			success: true,
			errMsg: ''
		}
		// 查询账号信息
		const { isParent, user: parent, userTable: parentTable } = await getUserInfo(userInfo._id)
		let { children } = parent
		if (!isParent) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
		if (Array.isArray(children)) {
			if (children.includes(childName)) return Object.assign(ret, { success: false, errMsg: '已存在子账号！' })
		} else {
			children = []
		}
		// 查询子账号
		const chlidTable = usersTable.where({ username: childName }).limit(1)
		const { data: childs } = await chlidTable.get()
		if (childs.length <= 0) return Object.assign(ret, { success: false, errMsg: '子账号不存在！' })
		const child = childs[0]
		// 子账号标记家长账号
		const res = await chlidTable.update({ parent_id: parent._id })
		if (res.updated === 0) return Object.assign(ret, { success: false, errMsg: '子账号标记失败！' })
		// 家长账号添加子账号信息
		children.push(child.username)
		const { updated } = await parentTable.update({ children })
		if (updated === 0) return Object.assign(ret, { success: false, errMsg: '子账号信息添加失败！' })
		return ret
	},
	/* 获取全部子账号 */
	getAllChildren: async function (userInfo) {
		const ret = {
			success: true,
			errMsg: ''
		}
		// 查询账号信息
		const { isParent, user } = await getUserInfo(userInfo._id)
		let { children } = user
		if (!isParent) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
		if (!Array.isArray(children)) {
			ret.data = []
			return ret
		}

		const { data: childs } = await usersTable.where({ username: dbCmd.in(children) }).get()
		ret.data = childs
		return ret
	}
}
