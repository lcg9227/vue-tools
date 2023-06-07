/* 统一校验函数 */

// 正整数校验
export const positiveIntegerCheck = (rule, value, data, callback) => {
	if (!/^\+?[1-9]\d*$/.test(value)) {
		callback('只能输入正整数')
	}
	return true
}
