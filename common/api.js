import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
import { toast, cacheApiData, cacheReset } from './pocket'

const userObj = uniCloud.importObject('lcg-user')
const configObj = uniCloud.importObject('lcg-config')
const taskObj = uniCloud.importObject('lcg-task')

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
	// console.log('当前登录信息>>>', _hasLogin, userInfo)
	return userInfo
}
// 获取账号详情
export const get_user_detail = username => {
	return cacheApiData({ _id: username }, 'user_detail', () => userObj.getDetail(username))
}
// 添加子账号
export const add_child = childName => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo, 'children', () =>
		userObj.addChlid(userInfo, childName).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('添加成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 获取子账号信息
export const get_children = () => {
	const userInfo = getUserInfo()
	return cacheApiData(userInfo, 'children', () => userObj.getAllChildren(userInfo)).then(res => {
		console.log('get_children >>>', res)
		return res
	})
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

// 子账号 修改积分
export const edit_child_score = params => {
	const userInfo = getUserInfo()
	const { username } = params
	return cacheReset({ _id: username }, 'user_detail', () =>
		userObj.editChildScore(userInfo, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('修改积分成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}

// 创建任务
export const create_task = params => {
	const userInfo = getUserInfo()
	console.log('create_task >>>', params)
	return cacheReset(userInfo, 'task_list', () =>
		taskObj.create_task(userInfo, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('创建任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 获取任务列表
export const get_task_list = () => {
	const userInfo = getUserInfo()
	return cacheApiData(userInfo, 'task_list', () => taskObj.get(userInfo))
}
// 任务编辑
export const edit_task = (id, params) => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo, 'task_list', () =>
		taskObj.edit_task(userInfo, id, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('编辑任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
