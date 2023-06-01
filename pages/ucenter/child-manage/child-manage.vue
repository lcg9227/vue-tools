<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<uni-nav-bar shadow left-icon="left" title="子账号管理" @clickLeft="back" />
		<button @click="testClick">按钮</button>
		<lcg-easy-form ref="easyForm"></lcg-easy-form>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar'
	// #endif
	export default {
		components: {
			// #ifdef APP-PLUS
			statusBar
			// #endif
		},
		data() {
			return {
				current: 0,
				userInfo: {}
			}
		},
		onLoad() {
			const _hasLogin = this.pocket.hasLogin()
			console.log('是否登录>>>', _hasLogin)
			if (_hasLogin) {
				const userInfo = this.pocket.getUserInfo()
				this.userInfo = userInfo
				console.log('当前登录信息>>>', userInfo)
			}
		},
		methods: {
			back() {
				uni.navigateBack(1, 'pop-out')
			},
			testClick() {
				const form = {
					fields: { child: '' },
					items: [{ field: 'child', label: '子账号', type: 'input', placeholder: '请输入子账号用户名', required: true, rules: [{ required: true, errorMessage: '请输入子账号用户名' }] }]
				}
				this.$refs.easyForm.open('添加子账号', form, data => {
					this.$refs.easyForm.onClose()
					console.log('easyForm >>>', data)
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
