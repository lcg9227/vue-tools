<template>
	<div class="list">
		<template v-for="(item, index) in list" :key="index">
			<div class="item">
				<div class="left">
					<lcg-iconfont :type="item.icon" :color="item.icon_color || ''" :fontSize="60"></lcg-iconfont>
				</div>
				<div class="center">
					<div class="name b-ellipsis">{{ item.name }}</div>
					<div class="describe b-ellipsis">{{ item.describe }}</div>
				</div>
				<div class="right">
					<button class="button" type="primary" size="mini">分发</button>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
	import { getCurrentInstance } from 'vue'
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		setup(props) {
			const { proxy } = getCurrentInstance()
			console.log('props >>>', props)
			return {}
		}
	}
</script>
<style scoped lang="scss">
	.list {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 20rpx 30rpx;
		.item {
			position: relative;
			height: 160rpx;
			background-color: #fff;
			box-shadow: 0 0 10rpx #f2f2f2;
			border: 1px solid #f4f4f4;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
      margin-bottom: 20rpx;
			.left {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
				border: 1px solid #f4f4f4;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.center {
        width: calc(100% - 220rpx);
				padding-left: 20rpx;
				padding-right: 20rpx;
        box-sizing: border-box;
				.name {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					font-weight: bold;
				}
				.describe {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					margin-top: 4rpx;
				}
			}
			.right {
				width: 80rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				.button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80rpx;
					height: 80rpx;
					border-radius: 80rpx;
					font-size: 24rpx;
					padding: 0;
					background-color: $lcg-main-button-bg;
				}
			}
		}
	}
</style>
