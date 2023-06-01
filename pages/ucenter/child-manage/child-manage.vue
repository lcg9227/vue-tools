<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<uni-nav-bar shadow left-icon="left" title="子账号管理" @clickLeft="back" />
		<button @click="testClick">添加子账号</button>
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
			this.userInfo = this.api.getUserInfo()
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
					this.api.add_child(data.child).then(res => {
						console.log('easyForm res>>>>', res)
						this.$refs.easyForm.onClose()
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
