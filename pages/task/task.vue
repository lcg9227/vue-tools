<template>
	<lcg-nav-bar></lcg-nav-bar>
	<view class="warp" v-if="!loading">
		<button class="button" type="primary" size="mini" @click="openTaskFrom">创建任务</button>
	</view>
	<TaskConfigList :list="userTaskList" :userInfo="userInfo"></TaskConfigList>
	<TaskForm ref="taskForm"></TaskForm>
</template>

<script>
	import TaskForm from './components/task-form/task-form.vue'
	import TaskConfigList from './components/task-config-list/task-config-list.vue'
	export default {
		components: { TaskForm, TaskConfigList },
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
			// 获取全部页面数据
			getData() {
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
				this.getTaskConfigList().then(() => (this.loading = false))
			},
			// 获取任务配置列表
			getTaskConfigList() {
				return this.api.get_task_config_list().then(({ data }) => {
					// console.log('get_task_config_list >>>', data)
					const { userTaskList } = data
					this.userTaskList = userTaskList
				})
			},
			// 打开任务表单
			openTaskFrom() {
				this.$refs.taskForm.open(null, data => {
					this.api.create_task(data).then(({ success }) => {
						if (success) {
							this.getTaskConfigList()
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
