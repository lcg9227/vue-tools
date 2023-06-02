<template>
	<view class="warp">
		<lcg-nav-bar title="子账号管理"></lcg-nav-bar>
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
	const form = {
		fields: { child: '' },
		items: [{ field: 'child', label: '子账号', type: 'input', placeholder: '请输入子账号用户名', required: true }]
	}
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
			this.getChildren()
		},

		methods: {
			getChildren() {
				this.api.get_children().then(({ success, data }) => success && (this.children = data))
			},
			testClick() {
				this.$refs.easyForm.open('添加子账号', this.pocket.deepCopy(form), data =>
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

<style lang="scss" scoped>
	.warp {
		position: relative;
	}
</style>
