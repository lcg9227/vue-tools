<template>
	<view class="warp" v-if="!loading">
		<lcg-nav-bar title="子账号"></lcg-nav-bar>
		<lcg-header :userDetail="userDetail" :config="config"></lcg-header>
		<button class="button" type="primary" size="mini" @click="editChildScore('add')">增加积分</button>
		<button class="button" type="primary" size="mini" @click="editChildScore('lower')">消费积分</button>
	</view>
	<lcg-easy-form ref="score_easyForm"></lcg-easy-form>
</template>

<script>
	const score_form = {
		fields: { score: '', notes: '' },
		items: [
			{ field: 'score', label: '积分', type: 'input', placeholder: '请输入变化的积分', required: true },
			{ field: 'notes', label: '备注', type: 'input', placeholder: '请输入备注信息', required: true }
		]
	}
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
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
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
			},
			// 添加孩子账号的积分
			editChildScore(type) {
				this.$refs.score_easyForm.open(type === 'add' ? '添加积分' : '消费积分', this.pocket.deepCopy(score_form), data => {
					const params = { ...data, type, username: this.chlidName }
					this.api.edit_child_score(params).then(({ success }) => {
						if (success) {
							this.getDetail()
							this.$refs.score_easyForm.onClose()
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		position: relative;
		.button {
			margin-left: 40rpx;
		}
	}
</style>
