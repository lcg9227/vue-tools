<template>
	<view class="warp" v-if="!loading">
		<lcg-nav-bar :statusBarStyle="{ backgroundColor: '#69c98b' }"></lcg-nav-bar>
		<lcg-header :userDetail="userDetail" :config="config"></lcg-header>
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
				userDetail: {},
				config: {}
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			this.getData()
		},
		methods: {
			getData() {
				this.api.get_user_detail().then(({ data: userDetail }) => {
					this.userDetail = userDetail
					this.api.get_config().then(config => {
						console.log('getData >>>', userDetail, config)
						this.loading = false
						this.config = config
					})
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
