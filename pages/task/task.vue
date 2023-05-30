<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
    任务
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar'
	// #endif
	export default {
		components: {
			// #ifdef APP-PLUS
			statusBar,
			// #endif
		},
		data() {
			return {
				current: 0,
				userInfo: {}
			}
		},
		onLoad() {
			const _hasLogin = this.pocket.hasLogin()
			console.log('是否登录>>>', _hasLogin)
			if (_hasLogin) {
				const userInfo = this.pocket.getUserInfo()
				this.userInfo = userInfo
				console.log('当前登录信息>>>', userInfo)
			}
		},
		methods: {}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.warp {
		position: relative;
	}
</style>
