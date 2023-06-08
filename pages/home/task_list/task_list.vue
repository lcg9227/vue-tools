<template>
	<div class="list">
		<template v-for="(item, index) in list" :key="index">
			<div class="item">
				<div class="left">
					<!-- <uni-tag class="tag" :text="item.reward" :mark="true" type="warning" /> -->
					<lcg-iconfont :type="item.icon" :color="item.icon_color || ''" :fontSize="60"></lcg-iconfont>
				</div>
				<div class="center">
					<div class="name b-ellipsis">{{ item.task_name }}</div>
					<div class="sub-info b-ellipsis">{{ getSubText(item) }}</div>
					<div class="reward">奖励积分：{{ item.reward }}</div>
				</div>
				<div class="right">
					<div class="setting" @click="openSetting(item)" v-if="isParent">
						<lcg-iconfont type="t-icon-jinrong1" color="#fff" :fontSize="24"></lcg-iconfont>
					</div>
					<uni-transition mode-class="slide-right" class="setting-box" :show="item.setOpen" v-if="isParent">
						<button class="btn" type="warn" size="mini" @click="deleteTask(item)">取消</button>
					</uni-transition>
					<button class="button" size="mini" v-if="isParent" @click="deleteTask(item)">完成</button>
				</div>
			</div>
		</template>
	</div>
	<lcg-easy-form ref="easyForm"></lcg-easy-form>
</template>
<script>
	import { ref, getCurrentInstance } from 'vue'
	export default {
		components: {},
		props: {
			userInfo: {
				type: Object,
				default: {}
			},
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		setup(props) {
			const { proxy } = getCurrentInstance()
			const isParent = proxy.userInfo.role.includes('parent')
			const { EXECUTE_WEEKS } = proxy.dataConfig
			// 次信息
			const getSubText = item => {
				const { execute_type, execute_weeks, execute_days } = item
				let text = ''
				if (execute_type === 1) {
					text = `任务时间：${execute_days}天`
				}
				if (execute_type === 2) {
					let weekText = ''
					if (execute_weeks.length === 2 && execute_weeks.includes(0) && execute_weeks.includes(6)) {
						weekText = '周末'
					} else {
						const curs = EXECUTE_WEEKS.filter(v => execute_weeks.includes(v.value)).map(v => v.text)
						weekText = curs.join(',')
					}
					text = `每${weekText}执行`
				}
				return text
			}
			// 打开设置
			const openSetting = item => {
				item.setOpen = !item.setOpen
			}
			// 删除任务
			const deleteTask = item => {}
			return { isParent, openSetting, getSubText, deleteTask }
		}
	}
</script>
<style scoped lang="scss">
	.list {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 20rpx 30rpx;
		.item {
			position: relative;
			height: 160rpx;
			background-color: #fff;
			box-shadow: 0 0 10rpx #f2f2f2;
			border: 1px solid #f4f4f4;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 20rpx;
			overflow: hidden;
			.left {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
				border: 1px solid #f4f4f4;
				display: flex;
				align-items: center;
				justify-content: center;
				.tag {
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			.center {
				width: calc(100% - 220rpx);
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				padding-top: 10rpx;
				.name {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					font-weight: bold;
				}
				.sub-info {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					margin-top: 4rpx;
				}
				.reward {
					font-size: $uni-font-size-sm;
					color: $uni-color-warning;
					font-weight: bold;
					margin-top: 4rpx;
				}
			}
			.right {
				width: 80rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				.setting {
					position: absolute;
					top: 0;
					right: 0;
					width: 40rpx;
					height: 40rpx;
					border-bottom-left-radius: 60rpx;
					background-color: $uni-color-primary;
					display: flex;
					justify-content: flex-end;
					padding: 6rpx;
					box-sizing: border-box;
					z-index: 11;
				}
				.setting-box {
					position: absolute;
					top: 0;
					right: 0;
					width: 200rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					background-color: #fff;
					box-shadow: 0 0 10rpx #f2f2f2;
					padding-left: 20rpx;
					z-index: 10;
					.btn {
						width: 160rpx;
						margin: 0;
					}
				}
				.button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80rpx;
					height: 80rpx;
					border-radius: 80rpx;
					font-size: 24rpx;
					padding: 0;
					color: #fff;
					background-color: $lcg-main-button-bg;
				}
			}
		}
	}
</style>