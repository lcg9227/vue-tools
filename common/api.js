import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
import { toast, cacheApiData, cacheReset } from './pocket'

const childrenObj = uniCloud.importObject('lcg-user-children')
const configObj = uniCloud.importObject('lcg-config')

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
	return cacheApiData(userInfo, 'children', () => childrenObj.get(userInfo))
}

// 获取配置
export const get_config = () => {
	const userInfo = getUserInfo()
	return cacheApiData(userInfo, 'config', () => configObj.get(userInfo).then(res => res.data))
}

// 添加积分等级
export const add_score_level = params => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo, 'config', () =>
		configObj.add_score_level(userInfo, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('添加成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 修改积分等级
export const edit_score_level = (params, index) => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo, 'config', () =>
		configObj.edit_score_level(userInfo, params, index).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('修改成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 删除积分等级
export const del_score_level = index => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo, 'config', () =>
		configObj.del_score_level(userInfo, index).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('删除成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
