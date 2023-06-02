const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')

/* 判断是否是家长账号 */
const isParent = async function (userInfo) {
	const ret = {
		success: true,
		errMsg: ''
	}
	// 查询家长账号
	const parentTable = usersTable.where({ _id: userInfo._id }).limit(1)
	const { data: parents } = await parentTable.get()
	const parent = parents[0]
	let { role } = parent
	if (!role.includes('parent')) return Object.assign(ret, { success: false, errMsg: '不是家长账号！' })
	ret.data = parent
	ret.parentTable = parentTable
	return ret
}

module.exports = {
	isParent
}
