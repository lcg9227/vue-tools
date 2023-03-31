<!-- item -->
<template>
	<div class="item-box">
		<div class="item" @click="click">
			<Iconfont :type="config.icon || 'xiaoxi1'" :font-size="config.iconFontSize || 40" :color="config.iconColor || '#007aff'" />
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
			default: '',
		},
		config: {
			type: Object,
			default: {},
		},
	})
	// 点击事件
	const click = () => {
		if (props.config.type === 'page') {
			console.log('>>>', proxy)
			proxy.goPage('pages/grid/grid')
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
	}
</style>
