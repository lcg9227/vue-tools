<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar style="background-color: #69c98b"></statusBar>
		<!-- #endif -->
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
			statusBar
			// #endif
		},
		data() {
			return {
				current: 0,
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = this.api.getUserInfo()
		},
		methods: {}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
