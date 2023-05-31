<template>
	<div class="header">
		<div class="b-between-c">
			<div class="info">
				<div class="nickname">hi，梨子</div>
				<div class="tip">让我们一起学习吧！</div>
			</div>
			<div class="image-box" v-if="userInfo.hasLogin && userInfo.avatar_file && userInfo.avatar_file.url">
				<image class="img" mode="aspectFill" :src="userInfo.avatar_file.url"></image>
			</div>
		</div>
		<div class="card">
			<div class="b-between">
				<div class="score-box">
					<div class="b-label">我的积分</div>
					<div class="score">{{ userInfo.score }} / 10000000</div>
				</div>
				<div class="card-right">
					<div class="gotask" @click="gotask">去做任务</div>
					<div class="b-label">lv:10</div>
				</div>
			</div>
			<div class="card-progress">
				<lcg-progress :percent="68" stroke-color="linear-gradient(to right, #AFEDC5, #0BDE55)" :showInfo="false"></lcg-progress>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			userInfo: {
				type: Object,
				default: {}
			}
		},
		components: {},
		data() {
			return {}
		},
		onLoad() {
			console.log('header onLoad >>>', this.userInfo)
		},
		methods: {
			gotask() {
				uni.switchTab({ url: '/pages/task/task' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		height: 320rpx;
		background-color: $lcg-bg-color-main;
		color: $lcg-text-color-inverse;
		padding: 20rpx 40rpx 0 40rpx;
		margin-bottom: 120rpx;
	}
	.info {
		display: flex;
		flex-direction: column;
		.nickname {
			font-size: $uni-font-size-big;
			margin-bottom: 12rpx;
		}
	}
	.image-box {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		border-radius: 50%;
		background-color: $uni-bg-color;
		margin: 30rpx 20rpx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.card {
		position: absolute;
		left: 10%;
		bottom: -80rpx;
		width: 80%;
		height: 188rpx;
		padding: 24rpx 30rpx;
		background-color: $uni-bg-color;
		border-radius: 16rpx;
		box-shadow: 0 20rpx 40rpx #ebedf0;
		box-sizing: border-box;
	}
	.score-box {
		display: flex;
		flex-direction: column;
		.score {
			font-size: $uni-font-size-lg;
			color: $lcg-text-color-important;
			font-weight: bold;
			margin-top: 8rpx;
		}
	}
	.card-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	.card-progress {
		margin-top: 10rpx;
	}
	.gotask {
		font-size: $uni-font-size-base;
		color: #69c98b;
		cursor: pointer;
	}
</style>
