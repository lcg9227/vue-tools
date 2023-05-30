<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<Header :userInfo="userInfo"></Header>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar'
	// #endif
	import Header from './components/header/header.vue'
	export default {
		components: {
			// #ifdef APP-PLUS
			statusBar,
			// #endif
			Header
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
