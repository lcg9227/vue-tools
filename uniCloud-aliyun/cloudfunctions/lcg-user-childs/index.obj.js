const db = uniCloud.database()
const dbCmd = db.command
const usersTable = db.collection('uni-id-users')
module.exports = {
	add: async function (userInfo, childName) {
		console.log('add >>>', userInfo, childName)
	}
}
