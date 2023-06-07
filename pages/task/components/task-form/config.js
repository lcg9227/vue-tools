import { getAllIcons } from '@/components/lcg-iconfont'
import { positiveIntegerCheck, arrayLengthCheck } from '@/common/formValidate'
const RULES = {
	name: {
		rules: [
			{
				required: true,
				errorMessage: '请填写任务名称'
			},
			// 对name字段进行长度验证
			{
				maxLength: 20,
				errorMessage: '{label}长度在{maxLength} 个字符以内'
			}
		]
	},
	execute_days: {
		rules: [
			{
				required: true,
				errorMessage: '请输入天数'
			},
			{
				validateFunction: (...ages) => positiveIntegerCheck(...ages)
			}
		]
	},
	execute_weeks: {
		rules: [
			{
				validateFunction: (...ages) => arrayLengthCheck(...ages, 1)
			}
		]
	},
	reward: {
		rules: [
			{
				required: true,
				errorMessage: '请输入奖励积分'
			},
			{
				validateFunction: (...ages) => positiveIntegerCheck(...ages)
			}
		]
	}
}

const getIconColorData = COLOR => {
	return COLOR.map(color => {
		return {
			render: h =>
				h(
					'div',
					{
						style: {
							display: 'flex',
							'flex-direction': 'row',
							'align-items': 'center'
						}
					},
					[h('div', { style: { width: '20rpx', height: '20rpx', 'border-radius': '20rpx', 'background-color': color } }, ''), h('span', { style: { 'margin-left': '20rpx' } }, color)]
				),
			text: color,
			value: color
		}
	})
}

export const useFormConfig = async proxy => {
	const { TASK_TYPE, COLOR, EXECUTE_TYPE, EXECUTE_WEEKS } = proxy.dataConfig
	const rules = RULES
	const localdata = {
		task_type: TASK_TYPE,
		execute_type: EXECUTE_TYPE,
		execute_weeks: EXECUTE_WEEKS,
		icon: getAllIcons('iconselect'),
		icon_color: getIconColorData(COLOR)
	}
	const fields = { task_type: 1, name: '', describe: '', icon: localdata.icon[0].value, icon_color: localdata.icon_color[0].value, execute_type: 1, execute_days: 1, execute_weeks: [], reward: 10 }
	return { fields, rules, localdata }
}
