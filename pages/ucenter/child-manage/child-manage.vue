<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<uni-nav-bar shadow left-icon="left" title="开启阴影" @clickLeft="back" />
		<lcg-header :userInfo="userInfo"></lcg-header>
		<lcg-header :userInfo="userInfo"></lcg-header>
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
	.warp {
		position: relative;
	}
</style>
