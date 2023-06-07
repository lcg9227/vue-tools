import { getAllIcons } from '../lcg-iconfont'
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
			value: color
		}
	})
}

export const useFormConfig = async proxy => {
	const { TASK_TYPE, COLOR } = proxy.dataConfig
	const fields = { task_type: 1, name: '', describe: '', icon: '', icon_color: '', execute_type: 1, execute_days: 1, execute_weeks: [], reward: 10 }
	const rules = RULES
	const localdata = {
		task_type: TASK_TYPE,
		icon: getAllIcons('iconselect'),
		icon_color: getIconColorData(COLOR)
	}
	return { fields, rules, localdata }
}
