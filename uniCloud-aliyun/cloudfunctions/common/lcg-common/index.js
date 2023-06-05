const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')

/* 获取账号信息 */
const getUserInfo = async function (_id) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询账号信息
	const userTable = usersTable.where({ _id }).limit(1)
	const { data: users } = await userTable.get()
	const user = users[0]
	const { role } = user || {}
	ret.user = user
	ret.userTable = userTable
	ret.isParent = role.includes('parent')
	return ret
}

module.exports = {
	getUserInfo
}
