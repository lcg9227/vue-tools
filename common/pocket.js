// 提示
export const toast = {
	success: title => uni.showToast({ title, icon: 'success', duration: 3000 }),
	error: title => uni.showToast({ title, icon: 'error', duration: 3000 })
}

// 深拷贝
export const deepCopy = obj => {
	if (typeof obj !== 'object') return console.error(new Error('第一个参数不是引用类型！'))
	return JSON.parse(JSON.stringify(obj))
}
// 判断两个对象是否一致
export const checkObject = (obj1, obj2) => {
	return JSON.stringify(obj1) == JSON.stringify(obj2)
}
// 函数防抖
export const debounce = (fn, delay = 300) => {
	let timer = null
	return function (...args) {
		if (timer != null) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(() => {
			fn.call(this, ...args)
		}, delay)
	}
}

// 节流函数
export const throttle = (fn, delay = 300) => {
	let timer = null
	return function (...args) {
		if (timer == null) {
			timer = setTimeout(() => {
				fn.call(this, ...args)

				clearTimeout(timer)
				timer = null
			}, delay)
		}
	}
}

// 跳转页面
export const goPage = (url, data = {}, config = {}) => {
	uni.navigateTo({
		url,
		animationType: 'slide-in-left',
		animationDuration: 2000,
		success: function (res) {
			// 通过eventChannel向被打开页面传送数据
			res.eventChannel.emit('getPageData', data)
		},
		...config
	})
}
// 检查异常
export const checkError = error => {
	// 数据库读取操作失败，资源耗尽
	if (error.errCode === 'PrePayResourceExhausted') {
		console.log('error >>>', error.message)
	}
	return true
}

// get接口缓存
export const cacheApiData = (id, name, params, api) => {
	const { reload } = params
	const cacheData = uni.getStorageSync('cacheApiData') || {}
	if (!cacheData[id]) {
		cacheData[id] = {}
	}
	if (!reload) {
		// const cur = cacheData[id][name]
		// if (cur && cur.expirationTime - Date.now() > 0) {
		// 	return new Promise(resolve => resolve(cur.data))
		// }
	}
	return api().then(res => {
		// console.log('重新请求数据 >>>', name, res)
		cacheData[id][name] = deepCopy({ data: res, expirationTime: Date.now() + 24 * 60 * 60 * 1000 })
		uni.setStorage({ key: 'cacheApiData', data: cacheData })
		return res
	})
}
// set接口重置缓存，让下一次get请求能够重新请求到新的值
export const cacheReset = (id, name, api) => {
	const cacheData = uni.getStorageSync('cacheApiData') || {}
	if (!cacheData[id]) {
		cacheData[id] = {}
	}
	const isarray = Array.isArray(name)
	if (isarray) {
		name.forEach(_name => {
			if (!cacheData[id][_name]) {
				cacheData[id][_name] = {}
			}
		})
	} else {
		if (!cacheData[id][name]) {
			cacheData[id][name] = {}
		}
	}
	return api().then(res => {
		if (isarray) {
			name.forEach(_name => {
				cacheData[id][_name].expirationTime = Date.now() - 1000
			})
		} else {
			cacheData[id][name].expirationTime = Date.now() - 1000
		}
		uni.setStorage({ key: 'cacheApiData', data: cacheData })
		return res
	})
}
// 清除所有缓存数据
export const cacheClear = api => {
	uni.setStorage({ key: 'cacheApiData', data: '' })
	return api()
}
