<!-- 标题 -->
<template>
	<view class="section-box">
		<text class="decoration"></text>
		<text class="section-text">{{ title }}</text>
	</view>
</template>

<script setup>
	import { defineProps, computed } from 'vue'
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
	})
</script>

<style scoped lang="scss">
	.section-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
		margin: 20rpx 0;
	}
	.decoration {
		width: 8rpx;
		height: 26rpx;
		border-radius: 20rpx;
		background-color: #2979ff;
	}
	.section-text {
		color: #333;
		margin-left: 15rpx;
		font-weight: bold;
		font-size: 30rpx;
	}
</style>
