<template>
	<view class="warp">
		<lcg-nav-bar></lcg-nav-bar>
		任务
	</view>
</template>

<script>
	export default {
		components: {
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
