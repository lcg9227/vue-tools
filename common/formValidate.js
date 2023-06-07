/* 统一校验函数 */

// 正整数校验
export const positiveIntegerCheck = (rule, value, data, callback) => {
	if (!/^\+?[1-9]\d*$/.test(value)) {
		callback('只能输入正整数！')
	}
	return true
}
// 数组长度校验
export const arrayLengthCheck = (rule, value, data, callback, len) => {
	if (value.length < len) {
		callback(`最少选择${len}个！`)
	}
	return true
}
