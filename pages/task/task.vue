<template>
	<lcg-nav-bar></lcg-nav-bar>
	<view class="warp" v-if="!loading">
		<button class="button" type="primary" size="mini" @click="openTaskFrom">创建任务</button>
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
				userTaskList: [],
				systemTaskList: []
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
				this.getTaskList().then(() => (this.loading = false))
			},
			getTaskList() {
				return this.api.get_task_list().then(({ data }) => {
					console.log('get_task_list >>>', data)
					const { userTaskList } = data
				})
			},
			openTaskFrom() {
				this.$refs.taskForm.open(null, data => {
					this.api.create_task(data).then(({ success }) => {
						if (success) {
							this.getData()
							this.$refs.taskForm.onClose()
						}
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
