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
