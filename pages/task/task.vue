<template>
	<lcg-nav-bar></lcg-nav-bar>
	<view class="warp" v-if="!loading">
		<button class="button" type="primary" size="mini" @click="openTaskFrom">添加任务</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				loading: true,
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
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
			},
			openTaskFrom() {
				
			}
		}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
