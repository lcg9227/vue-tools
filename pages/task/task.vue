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
