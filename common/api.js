import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
import { toast } from './pocket'

const childrenObj = uniCloud.importObject('lcg-user-children')

// 判断是否登录
export const hasLogin = () => {
	const _hasLogin = uniCloud.getCurrentUserInfo().tokenExpired > Date.now()
	if (!_hasLogin) {
    mutations.logout()
		return _hasLogin
	}
	return _hasLogin
}
// 获取用户信息
export const getUserInfo = () => {
	const _hasLogin = hasLogin()
	const userInfo = { ...store.userInfo, hasLogin: _hasLogin }
	console.log('当前登录信息>>>', _hasLogin, userInfo)
	return userInfo
}
// 添加子账号
export const add_child = childName => {
	const userInfo = getUserInfo()
	return childrenObj.add(userInfo, childName).then(res => {
		const { success, errMsg } = res
		if (success) toast.success('添加成功！')
		if (!success) toast.error(errMsg)
		return res
	})
}
// 获取子账号信息
export const get_children = () => {
	const userInfo = getUserInfo()
	return childrenObj.get(userInfo)
}
