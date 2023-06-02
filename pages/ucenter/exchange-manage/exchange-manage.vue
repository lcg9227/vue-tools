<template>
	<view class="warp">
		<lcg-nav-bar title="兑换管理"></lcg-nav-bar>
		<uni-card title="积分配置" extra=""> </uni-card>
		<lcg-easy-form ref="easyForm"></lcg-easy-form>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				current: 0,
				userInfo: {},
				children: []
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			this.api.get_config().then(config => (this.config = config))
		},
		methods: {}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
