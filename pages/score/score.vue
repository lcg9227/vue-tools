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
			// 获取全部页面数据
			getData() {
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
				this.getConfig()
					.then(() => this.getDetail())
					.then(() => (this.loading = false))
			},
			// 获取配置
			getConfig() {
				return this.api.get_config().then(config => (this.config = config))
			},
			// 获取用户详情
			getDetail() {
				const { username } = this.userInfo
				return this.api.get_user_detail(username).then(({ data: userDetail }) => {
					this.userDetail = userDetail
					console.log('userDetail >>>', username, this.config, userDetail)
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
