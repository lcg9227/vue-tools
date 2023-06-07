<template>
	<uni-popup ref="popup" type="top">
		<div class="popup" :style="style">
			<div class="content" v-if="showForm">
				<uni-forms :model="fields" ref="form" :label-width="100" :rules="rules">
					<uni-forms-item label="任务类型" name="task_type" required>
						<uni-data-checkbox v-model="fields.task_type" :localdata="localdata.task_type"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="任务名称" name="name" required>
						<uni-easyinput type="text" v-model="fields.name" placeholder="请输入任务名称" :maxlength="20" />
					</uni-forms-item>
					<uni-forms-item label="图标选择" name="icon" required>
						<lcg-select v-model="fields.icon" :localdata="localdata.icon"></lcg-select>
					</uni-forms-item>
					<uni-forms-item label="图标颜色选择" name="icon_color" required v-if="fields.icon.includes('t-icon-')">
						<lcg-select v-model="fields.icon_color" :localdata="localdata.icon_color"></lcg-select>
					</uni-forms-item>
					<uni-forms-item label="执行类型" name="execute_type" required>
						<uni-data-checkbox v-model="fields.execute_type" :localdata="localdata.execute_type"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="执行天数" name="execute_days" required v-if="fields.execute_type === 1">
						<uni-easyinput type="number" v-model="fields.execute_days" placeholder="请输入执行天数" :maxlength="3" />
					</uni-forms-item>
					<uni-forms-item label="执行周选择" name="execute_weeks" required v-if="fields.execute_type === 2">
						<uni-data-checkbox multiple v-model="fields.execute_weeks" :localdata="localdata.execute_weeks"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="奖励积分" name="reward" required>
						<uni-easyinput type="number" v-model="fields.reward" placeholder="请输入当前任务的奖励积分" :maxlength="10" />
					</uni-forms-item>
					<uni-forms-item label="任务说明" name="describe" required>
						<uni-easyinput type="textarea" v-model="fields.describe" placeholder="请输入任务说明" :maxlength="200" />
					</uni-forms-item>
				</uni-forms>
			</div>
			<div class="footer">
				<button class="closeButton" type="warn" @click="onClose">取消</button>
				<button class="submitButton" type="primary" @click="onSubmit">添加</button>
			</div>
		</div>
	</uni-popup>
</template>
<script>
	import { ref, reactive, getCurrentInstance, toRaw, nextTick, onBeforeMount } from 'vue'
	import { useFormConfig } from './config'
	export default {
		components: [],
		data() {
			return {}
		},
		setup(props) {
			const { proxy } = getCurrentInstance()
			// 弹窗样式设置
			const winInfo = uni.getWindowInfo()
			const height = `${winInfo.screenHeight - 80}px`
			const paddingTop = `${winInfo.statusBarHeight + 20}px`
			const style = reactive({
				height,
				paddingTop
			})
			// 标题
			const title = ref('')
			// 表单
			const fields = ref({})
			const rules = ref([])
			const localdata = ref({})
			const showForm = ref(false)
			const getDetail = async () => {
				const form = await useFormConfig(proxy)
				fields.value = form.fields
				rules.value = form.rules
				localdata.value = form.localdata
			}
			// 动作
			let submit = () => {}
			const onClose = () => {
				proxy.$refs.popup.close()
			}
			const onSubmit = () => {
				proxy.$refs.form.validate((err, formData) => {
					// 如果校验成功 ，err 返回 null
					if (!err) {
						submit(formData)
						return
					}
				})
			}
			const open = async (id, _submit) => {
				title.value = id ? '修改任务' : '添加任务'
				if (typeof _submit === 'function') {
					submit = _submit
				}
				await getDetail()
				nextTick(() => {
					proxy.$refs.popup.open()
					showForm.value = true
				})
			}
			return { style, showForm, fields, rules, localdata, title, onSubmit, onClose, open }
		}
	}
</script>
<style scoped lang="scss">
	.popup {
		position: relative;
		min-height: 400rpx;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			display: flex;
			flex-direction: row;
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			box-shadow: 0 -2rpx 20rpx #f2f2f2;
			.submitButton {
				border-radius: 100rpx;
				background-color: $lcg-main-button-bg;
				border: none;
				width: 60%;
			}
			.closeButton {
				border-radius: 100rpx;
				background-color: $lcg-cancel-button-bg;
				border: none;
				width: 30%;
			}
		}
	}
	.content {
		padding: 0 20px;
	}
</style>
