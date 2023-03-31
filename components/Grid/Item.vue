<!-- item -->
<template>
	<div class="item-box">
		<div class="item">
			<Iconfont :type="config.icon" :font-size="config.iconFontSize || 60" :color="config.iconColor || '#007aff'" />
			<div class="title">{{ title }}</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'
	import Iconfont from '../Iconfont/Iconfont.vue'
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		config: {
			type: Object,
			default: {
				icon: 'xiaoxi1',
			},
		},
	})
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
