import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
import { toast, cacheApiData, cacheReset, cacheClear } from './pocket'

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
export const get_user_detail = (username, reload) => {
	const cacheParams = { reload }
	return cacheApiData(username, 'user_detail', cacheParams, () => userObj.getDetail(username))
}
// 添加子账号
export const add_child = childName => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo.id, 'children', () =>
		userObj.addChlid(userInfo, childName).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('添加成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 获取子账号信息
export const get_children = reload => {
	const userInfo = getUserInfo()
	const cacheParams = { reload }
	return cacheApiData(userInfo.id, 'children', cacheParams, () => userObj.getAllChildren(userInfo)).then(res => {
		console.log('get_children >>>', res)
		return res
	})
}

// 获取配置
export const get_config = reload => {
	const userInfo = getUserInfo()
	const cacheParams = { reload }
	return cacheApiData(userInfo.id, 'config', cacheParams, () => configObj.get(userInfo).then(res => res.data))
}

// 添加积分等级
export const add_score_level = params => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo.id, 'config', () =>
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
	return cacheReset(userInfo.id, 'config', () =>
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
	return cacheReset(userInfo.id, 'config', () =>
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
	return cacheReset(username, 'user_detail', () =>
		userObj.editChildScore(userInfo, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('修改积分成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}

// 创建任务配置
export const create_task = params => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo.id, 'task_config', () =>
		taskObj.create_task(userInfo, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('创建任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 获取任务配置列表
export const get_task_config_list = reload => {
	const userInfo = getUserInfo()
	const cacheParams = { reload }
	return cacheApiData(userInfo.id, 'task_config', cacheParams, () => taskObj.get(userInfo))
}
// 任务配置编辑
export const edit_task = (id, params) => {
	const userInfo = getUserInfo()
	return cacheReset(userInfo.id, 'task_config', () =>
		taskObj.edit_task(userInfo, id, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('编辑任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 删除任务配置
export const delete_task = id => {
	const userInfo = getUserInfo()
	return cacheClear(() =>
		taskObj.detele_task(userInfo, id).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('删除任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}

// 分发任务
export const dispense_task = (id, params) => {
	const userInfo = getUserInfo()
	const { child: username } = params
	return cacheReset(username, 'task_list', () =>
		taskObj.dispense_task(userInfo, id, params).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('分发任务成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 获取子账号的进行中的任务列表
export const get_user_task_list = (username, reload) => {
	const userInfo = getUserInfo()
	const cacheParams = { reload }
	return cacheApiData(username, 'task_list', cacheParams, () => taskObj.getTaskList(userInfo, username))
}
// 任务标记完成
export const complete_task = (id, username) => {
	const userInfo = getUserInfo()
	return cacheReset(username, ['user_detail', 'task_list'], () =>
		taskObj.complete_task(userInfo, id, username).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('任务已标记完成！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 取消任务
export const cancel_task = (id, username) => {
	const userInfo = getUserInfo()
	return cacheReset(username, 'task_list', () =>
		taskObj.cancel_task(userInfo, id).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('任务已取消！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
// 领取任务
export const take_task = id => {
	const userInfo = getUserInfo()
	const { username } = userInfo
	return cacheReset(username, 'task_list', () =>
		taskObj.take_task(userInfo, id).then(res => {
			const { success, errMsg } = res
			if (success) toast.success('任务领取成功！')
			if (!success) toast.error(errMsg)
			return res
		})
	)
}
