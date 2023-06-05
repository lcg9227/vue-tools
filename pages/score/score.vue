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
				loading: true,
				current: 0,
				userInfo: {},
				config: {}
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			this.getData()
		},
		methods: {
			getData() {
				this.api.get_config().then(config => {
					console.log('config >>>', config)
					this.loading = false
					this.config = config
				})
			}
		}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
