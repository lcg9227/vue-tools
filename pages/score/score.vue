<template>
	<view class="warp">
		<lcg-nav-bar :statusBarStyle="{ backgroundColor: '#69c98b' }"></lcg-nav-bar>
		<lcg-header :userInfo="userInfo"></lcg-header>
		<lcg-header :userInfo="userInfo"></lcg-header>
	</view>
</template>

<script>
	export default {
		components: {},
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
