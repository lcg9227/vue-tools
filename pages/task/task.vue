<template>
	<lcg-nav-bar></lcg-nav-bar>
	<view class="warp" v-if="!loading">
		<button class="button" type="primary" size="mini" @click="openTaskFrom">添加任务</button>
	</view>
	<lcg-task-form ref="taskForm"></lcg-task-form>
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
				this.loading = false
			},
			openTaskFrom() {
				this.$refs.taskForm.open(null, data => {
					console.log('111 >>>', data)
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
