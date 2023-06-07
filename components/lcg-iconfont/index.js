import cConfig from './ciconfont/iconfont.json' // 彩色
import tConfig from './ticonfont/iconfont.json' // 单色

export const cIconConfig = cConfig
export const tIconConfig = tConfig

const getIconNode = (h, value, text, css_prefix_text) => {
	let _text = css_prefix_text === 'c-icon-' ? `彩色-${text}` : `单色-${text}`
	return h(
		'div',
		{
			style: {
				display: 'flex',
				'flex-direction': 'row',
				'align-items': 'center'
			}
		},
		[h('lcg-iconfont', { style: {}, class: value }, ''), h('span', { style: { 'margin-left': '20rpx' } }, _text)]
	)
}

const getIcons = (type, data) => {
	const { css_prefix_text, glyphs } = data
	const array = glyphs.map(v => {
		let render = null
		const value = `${css_prefix_text}${v.font_class}`
		const text = v.name
		if (type === 'iconselect') {
			render = h => getIconNode(h, value, text, css_prefix_text)
		}
		return {
			icon_id: v.icon_id,
			render,
			text,
			value
		}
	})
	return array
}

export const getCIcons = type => {
	return getIcons(type, cIconConfig)
}

export const getTIcons = type => {
	return getIcons(type, tIconConfig)
}

export const getAllIcons = type => {
	return [...getCIcons(type), ...getTIcons(type)]
}
