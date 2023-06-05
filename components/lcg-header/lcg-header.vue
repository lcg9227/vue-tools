<template>
	<div class="header" :style="{ marginBottom: userDetail.isParent ? '40rpx' : '120rpx' }">
		<div class="b-between-c">
			<div class="info">
				<div class="nickname">hi，{{ userDetail.nickname }}</div>
				<div class="tip">让我们一起学习吧！</div>
			</div>
			<div class="image-box">
				<image class="img" mode="aspectFill" :src="userDetail.avatar_file.url" v-if="userDetail.avatar_file && userDetail.avatar_file.url"></image>
				<image class="img" mode="aspectFill" src="/static/logo.png" v-else></image>
			</div>
		</div>
		<div class="card" v-if="!userDetail.isParent">
			<div class="b-between">
				<div class="score-box">
					<div class="b-label">我的积分</div>
					<div class="score">{{ userDetail.score }} / {{ scoreConfig.limit }}</div>
				</div>
				<div class="card-right">
					<div class="b-link" @click="gotask">去做任务</div>
					<div class="b-label">{{ scoreConfig.text }}</div>
				</div>
			</div>
			<div class="card-progress">
				<lcg-progress :percent="scoreConfig.percent" stroke-color="linear-gradient(to right, #AFEDC5, #0BDE55)" :showInfo="false"></lcg-progress>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			userDetail: {
				type: Object,
				default: {}
			},
			config: {
				type: Object,
				default: {}
			}
		},
		components: {},
		computed: {
			scoreConfig() {
				const { score, isParent } = this.userDetail
				if (isParent) return {}
				const { score_level } = this.config
				let ret = score_level[score_level.length]
				let isFind = false
				score_level.forEach(v => {
					if (score < v.limit && !isFind) {
						isFind = true
						ret = v
					}
				})
				ret.percent = Math.floor((score / ret.limit) * 100)
				return ret
			}
		},
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
</style>
