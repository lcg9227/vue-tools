const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
const { getUserInfo, getUserInfoByName } = require('lcg-common')

module.exports = {
	/* 获取账号详细信息 */
	getDetail: async function (username) {
		const ret = { success: true, errMsg: '' }
		// 查询账号信息
		let { isParent, user } = await getUserInfoByName(username)
		const { nickname, avatar_file, score } = user
		ret.data = { nickname, username, avatar_file, score: score || 0, isParent }
		return ret
	},
	/* 修改子账号积分 */
	editChildScore: async function (userInfo, params) {
		const ret = { success: true, errMsg: '' }
		const { username, score: _score, notes, type } = params
		// 查询账号信息
		const parentInfo = await getUserInfo(userInfo._id)
		if (!parentInfo.isParent) return Object.assign(ret, { success: false, errMsg: '当前账号不是家长账号！' })
		// 查询子账号信息
		let { isParent, user, userTable } = await getUserInfoByName(username)
		if (isParent) return Object.assign(ret, { success: false, errMsg: '变化的账号不是子账号！' })
		// 添加时用jql方式添加，可以获取默认值
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})
		// 积分校验
		const isInt = /^(?:0|(?:-?[1-9]\d*))$/.test(_score)
		if (!_score || !isInt) return Object.assign(ret, { success: false, errMsg: '积分只能输入整数！' })
		const preScore = user.score || 0
		const score = Number(_score)
		const info = {
			operate_user_id: userInfo._id,
			user_id: user._id,
			type: type === 'add' ? 1 : 2,
			score,
			comment: notes,
			balance: type === 'add' ? preScore + score : preScore - score
		}
		if (info.balance < 0) return Object.assign(ret, { success: false, errMsg: '积分不足！' })
		await dbJQL.collection('uni-id-scores').add(info)
		const { updated } = await userTable.update({ score: info.balance })
		if (updated === 0) return Object.assign(ret, { success: false, errMsg: '积分修改失败！' })

		return ret
	},
	/* 添加子账号 */
	addChlid: async function (userInfo, childName) {
		const ret = { success: true, errMsg: '' }
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
		const ret = { success: true, errMsg: '' }
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
