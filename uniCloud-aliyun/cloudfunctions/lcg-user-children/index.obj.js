const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')

module.exports = {
	/* 添加子账号 */
	add: async function (userInfo, childName) {
		const ret = {
			success: true,
			errMsg: ''
		}
		// 查询家长账号
		const parentTable = usersTable.where({ _id: userInfo._id }).limit(1)
		const { data: parents } = await parentTable.get()
		const parent = parents[0]
		let { role, children } = parent
		if (!role.includes('parent')) {
			ret.success = false
			ret.errMsg = '不是家长账号！'
			return ret
		}
		if (Array.isArray(children)) {
			if (children.includes(childName)) {
				ret.success = false
				ret.errMsg = '已存在子账号！'
				return ret
			}
		} else {
			children = []
		}
		// 查询子账号
		const chlidTable = usersTable.where({ username: childName }).limit(1)
		const { data: childs } = await chlidTable.get()
		if (childs.length <= 0) {
			ret.success = false
			ret.errMsg = '子账号不存在！'
			return ret
		}
		const child = childs[0]
		// 子账号标记家长账号
		const res = await chlidTable.update({ parent_id: parent._id })
		if (res.updated === 0) {
			ret.success = false
			ret.errMsg = '子账号标记失败！'
			return ret
		}
		// 家长账号添加子账号信息
		children.push(child.username)
		const { updated } = await parentTable.update({ children })
		if (updated === 0) {
			ret.success = false
			ret.errMsg = '子账号信息添加失败！'
			return ret
		}
		return ret
	},
	/* 获取全部子账号 */
	get: async function (userInfo) {
		const ret = {
			success: true,
			errMsg: ''
		}
		// 查询家长账号
		const parentTable = usersTable.where({ _id: userInfo._id }).limit(1)
		const { data: parents } = await parentTable.get()
		const parent = parents[0]
		let { role, children } = parent
		if (!role.includes('parent')) {
			ret.success = false
			ret.errMsg = '不是家长账号！'
			return ret
		}
		if (!Array.isArray(children)) {
			ret.data = []
			return ret
		}

		const { data: childs } = await usersTable.where({ username: dbCmd.in(children) }).get()
		ret.data = childs
		return ret
	}
}
