<template>
	<view class="warp" v-if="!loading">
		<lcg-nav-bar :statusBarStyle="{ backgroundColor: '#69c98b' }"></lcg-nav-bar>
		<lcg-header :userDetail="userDetail" :config="config"></lcg-header>
		<template v-if="!userDetail.isParent">
			<lcg-title title="我的任务"></lcg-title>
			<TaskList :list="taskList" :userInfo="userInfo" :userDetail="userDetail"></TaskList>
		</template>
	</view>
</template>

<script>
	import TaskList from '@/pages/home/task_list/task_list.vue'
	export default {
		components: { TaskList },
		data() {
			return {
				loading: true,
				userInfo: {},
				userDetail: {},
				taskList: [],
				config: {}
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
			// 获取全部页面数据
			getData(reload) {
				const { hasLogin } = this.userInfo
				if (!hasLogin) return
				return this.getConfig(reload)
					.then(() => this.getDetail(reload))
					.then(() => this.getTaskList(reload))
					.then(() => (this.loading = false))
			},
			// 获取配置
			getConfig(reload) {
				return this.api.get_config(reload).then(config => (this.config = config))
			},
			// 获取用户详情
			getDetail(reload) {
				const { username } = this.userInfo
				return this.api.get_user_detail(username, reload).then(({ data: userDetail }) => {
					this.userDetail = userDetail
					console.log('userDetail >>>', username, this.config, userDetail)
				})
			},
			// 获取子账号的任务列表
			getTaskList(reload) {
				const { isParent, username } = this.userDetail
				if (isParent) return async () => {}
				return this.api.get_user_task_list(username, reload).then(({ data: taskList }) => {
					this.taskList = taskList
					console.log('taskList  >>>', username, taskList)
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
