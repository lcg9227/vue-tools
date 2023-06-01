const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
module.exports = {
	add: async function (userInfo, childName) {
		const ret = {
			success: true,
			errMsg: ''
		}
		const parentTable = usersTable.where({ _id: userInfo._id })
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
		const { data: childs } = await usersTable.where({ username: childName }).get()
		if (childs.length <= 0) {
			ret.success = false
			ret.errMsg = '子账号不存在！'
			return ret
		}
		const child = childs[0]
		children.push(child.username)
		const { updated } = await parentTable.update({ children })
		if (updated === 0) {
			ret.success = false
			ret.errMsg = '更新失败！'
			return ret
		}
		return ret
	},
}
