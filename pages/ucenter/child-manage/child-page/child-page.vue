<template>
	<view class="warp" v-if="!loading">
		<lcg-nav-bar title="子账号"></lcg-nav-bar>
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
				config: {},
				chlidName: ''
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			const eventChannel = this.getOpenerEventChannel()
			// 获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('getPageData', data => {
				const { username } = data
				uni.setStorage({ key: 'childPageName', data: username })
				this.chlidName = username
				this.getData()
			})
			setTimeout(() => {
				if (!this.chlidName) {
					this.chlidName = uni.getStorageSync('childPageName')
					this.getData()
				}
			}, 1000)
		},
		methods: {
			getData() {
				this.getConfig()
					.then(() => this.getDetail())
					.then(() => (this.loading = false))
			},
			getConfig() {
				return this.api.get_config().then(config => (this.config = config))
			},
			getDetail() {
				if (!this.chlidName) return
				return this.api.get_user_detail(this.chlidName).then(({ data: userDetail }) => {
					this.userDetail = userDetail
					console.log('userDetail  >>>', this.chlidName, this.config, userDetail)
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
