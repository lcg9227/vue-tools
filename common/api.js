import { store } from '@/uni_modules/uni-id-pages/common/store.js'

const childObj = uniCloud.importObject('lcg-user-childs')

// 判断是否登录
export const hasLogin = () => {
	return uniCloud.getCurrentUserInfo().tokenExpired > Date.now()
}
// 获取用户信息
export const getUserInfo = () => {
	const _hasLogin = hasLogin()
	console.log('是否登录>>>', _hasLogin)
	let userInfo = { ...store.userInfo, hasLogin: _hasLogin }
	if (_hasLogin) {
		const _userInfo = uniCloud.getCurrentUserInfo()
		Object.assign(userInfo, _userInfo)
	}
	console.log('当前登录信息>>>', userInfo)
	return userInfo
}
// 添加子账号
export const add_child = () => {}
