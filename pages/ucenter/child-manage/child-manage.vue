<template>
	<view class="warp">
		<lcg-nav-bar title="子账号管理"></lcg-nav-bar>
		<button @click="testClick">添加子账号</button>
		<lcg-easy-form ref="easyForm"></lcg-easy-form>

		<uni-list title="子账号" :border="true">
			<template v-for="(child, index) in children" :key="index">
				<uni-list-chat
					clickable
					@click="goChildPage(child.username)"
					:title="child.nickname"
					:note="`当前积分：${child.score || 0}`"
					:avatar="child.avatar_file && child.avatar_file.url ? child.avatar_file.url : '/static/logo.png'"></uni-list-chat>
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
			this.getData()
		},
		onPullDownRefresh() {
			this.getData(true).then(() => uni.stopPullDownRefresh())
		},
		methods: {
			getData(reload) {
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
				return this.getChildren(reload).then(() => (this.loading = false))
			},
			getChildren() {
				return this.api.get_children().then(({ success, data }) => success && (this.children = data))
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
			},
			goChildPage(username) {
				this.pocket.goPage('/pages/ucenter/child-manage/child-page/child-page', { username })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		position: relative;
	}
</style>
