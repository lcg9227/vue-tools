<template>
	<div class="header">
		<div class="b-between">
			<div class="info">
				<div class="nickname">hi，梨子</div>
				<div class="tip">让我们一起学习吧！</div>
			</div>
			<div class="image">
        <u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></u--image>
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
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		height: 320rpx;
		background-color: #69c98b;
		color: $uni-text-color-inverse;
		padding: 20rpx 40rpx 0 40rpx;
		.info {
			display: flex;
			flex-direction: column;
			.nickname {
				font-size: $uni-font-size-big;
        margin-top: 24rpx;
        margin-bottom: 12rpx;
			}
		}
	}
</style>
