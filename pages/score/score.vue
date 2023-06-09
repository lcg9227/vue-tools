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
		onPullDownRefresh() {
			this.getData(true).then(() => uni.stopPullDownRefresh())
		},
		methods: {
			// 获取全部页面数据
			getData(reload) {
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
				return this.getConfig(reload)
					.then(() => this.getDetail(reload))
					.then(() => (this.loading = false))
			},
			// 获取配置
			getConfig(reload) {
				return this.api.get_config(reload).then(config => (this.config = config))
			},
			// 获取用户详情
			getDetail(reload) {
				const { username } = this.userInfo
				return this.api.get_user_detail(username, reload).then(({ data: userDetail }) => {
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
