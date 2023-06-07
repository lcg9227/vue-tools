
import cConfig from './ciconfont/iconfont.json' // 彩色
import tConfig from './ticonfont/iconfont.json' // 单色

export const cIconConfig = cConfig
export const tIconConfig = tConfig

const getIcons = data => {
	const { css_prefix_text, glyphs } = data
	const array = glyphs.map(v => {
		return {
			icon_id: v.icon_id,
			text: v.name,
			value: `${css_prefix_text}${v.font_class}`
		}
	})
	return array
}

export const getCIcons = () => {
	return getIcons(cIconConfig)
}

export const getTIcons = () => {
	return getIcons(tIconConfig)
}

export const getAllIcons = () => {
	return [...getCIcons(), ...getTIcons()]
}
