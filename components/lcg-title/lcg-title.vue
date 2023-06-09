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
			default: ''
		}
	})
</script>

<style scoped lang="scss">
	.section-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 10rpx;
		margin: 20rpx;
		border-bottom: 1px solid $uni-border-color;
	}
	.decoration {
		width: 8rpx;
		height: 26rpx;
		border-radius: 20rpx;
		background-color: $lcg-main-button-bg;
	}
	.section-text {
		color: #333;
		margin-left: 15rpx;
		font-weight: bold;
		font-size: 30rpx;
	}
</style>
