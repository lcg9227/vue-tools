<template>
	<view class="warp" v-if="!loading">
		<lcg-nav-bar title="子账号"></lcg-nav-bar>
		<lcg-header :userDetail="userDetail" :config="config"></lcg-header>
		<button class="button" type="primary" size="mini" @click="editChildScore('add')">增加积分</button>
		<button class="button" type="primary" size="mini" @click="editChildScore('lower')">消费积分</button>
		<TaskList :list="taskList" :userInfo="userInfo" :userDetail="userDetail"></TaskList>
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
	import TaskList from '@/pages/home/task_list/task_list.vue'
	export default {
		components: { TaskList },
		data() {
			return {
				loading: true,
				current: 0,
				userInfo: {},
				userDetail: {},
				config: {},
				taskList: [],
				chlidName: ''
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			uni.$once('getPageData', data => {
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
		onPullDownRefresh() {
			this.getData(true).then(() => uni.stopPullDownRefresh())
		},
		methods: {
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
			// 获取子账号详情
			getDetail(reload) {
				if (!this.chlidName) return
				return this.api.get_user_detail(this.chlidName, reload).then(({ data: userDetail }) => {
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
			},
			// 获取子账号的任务列表
			getTaskList(reload) {
				if (!this.chlidName) return
				return this.api.get_user_task_list(this.chlidName, reload).then(({ data: taskList }) => {
					this.taskList = taskList
					console.log('taskList  >>>', this.chlidName, taskList)
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
