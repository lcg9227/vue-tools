<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<uni-nav-bar shadow left-icon="left" title="子账号管理" @clickLeft="back" />
		<button @click="testClick">添加子账号</button>
		<lcg-easy-form ref="easyForm"></lcg-easy-form>

		<uni-list title="子账号" :border="true">
			<template v-for="(child, index) in children" :key="index">
				<uni-list-chat :title="child.nickname" :note="child.username" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"></uni-list-chat>
			</template>
		</uni-list>
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
				userInfo: {},
				children: []
			}
		},
		onLoad() {
			this.userInfo = this.api.getUserInfo()
			this.getChildren()
		},
		methods: {
			back() {
				uni.navigateBack(1, 'pop-out')
			},
			getChildren() {
				this.api.get_children().then(({ success, data }) => success && (this.children = data))
			},
			testClick() {
				const form = {
					fields: { child: '' },
					items: [{ field: 'child', label: '子账号', type: 'input', placeholder: '请输入子账号用户名', required: true, rules: [{ required: true, errorMessage: '请输入子账号用户名' }] }]
				}
				this.$refs.easyForm.open('添加子账号', form, data =>
					this.api.add_child(data.child).then(({ success }) => {
						if (success) {
							this.getChildren()
							this.$refs.easyForm.onClose()
						}
					})
				)
			}
		}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
