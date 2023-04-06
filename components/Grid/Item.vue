<!-- item -->
<template>
	<div class="item-box">
		<div class="item" @click="click">
			<Iconfont :type="config.icon || 'xiaoxi1'" :font-size="config.iconFontSize || 50" :color="config.iconColor || '#007aff'" />
			<div class="title">{{ title }}</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, getCurrentInstance } from 'vue'
	import Iconfont from '../Iconfont/Iconfont.vue'
	const { proxy } = getCurrentInstance()
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		config: {
			type: Object,
			default: {}
		}
	})
	// 点击事件
	const click = () => {
		const { type, url, title, path } = props.config
		if (type === 0) {
			if (path) {
				proxy.pocket.goPage(path)
				return
			}
			// 提示 todo
		}
		if (type === 1) {
			if (url) {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/common/webview/webview?url=' + url + '&title=' + title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
				return
			}
		}
	}
</script>

<style scoped lang="scss">
	.item-box {
		box-sizing: border-box;
		padding: 10rpx;
	}
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;
		cursor: pointer;
	}
	.title {
		text-align: center;
		width: 100%;
		padding-top: 10rpx;
		font-size: $uni-font-size-sm;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
	}
</style>
