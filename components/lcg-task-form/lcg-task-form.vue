<template>
	<uni-popup ref="popup" type="top">
		<div class="popup" :style="style">
			111
			<div class="footer">
				<button class="closeButton" type="warn" @click="onClose">取消</button>
				<button class="submitButton" type="primary" @click="onSubmit">添加</button>
			</div>
		</div>
	</uni-popup>
</template>
<script>
	import { ref, reactive, getCurrentInstance, toRaw, nextTick } from 'vue'
	export default {
		components: [],
		data() {
			return {}
		},
		setup(props) {
			const { proxy } = getCurrentInstance()
			const winInfo = uni.getWindowInfo()
			const height = `${winInfo.screenHeight - 80}px`
			const paddingTop = `${winInfo.statusBarHeight + 20}px`
			const style = reactive({
				height,
				paddingTop
			})
			console.log('win info >>>', winInfo)
			const title = ref('')
			const fields = ref({})
			const items = ref([])
			let submit = () => {}
			const onClose = () => {
				proxy.$refs.popup.close()
			}
			const onSubmit = () => {
				// proxy.$refs.form.validate((err, formData) => {
				// 	// 如果校验成功 ，err 返回 null
				// 	if (!err) {
				// 		submit(formData)
				// 		return
				// 	}
				// })
			}
			const open = async (id, _submit) => {
				title.value = id ? '修改任务' : '添加任务'
				if (typeof _submit === 'function') {
					submit = _submit
				}
				nextTick(() => {
					proxy.$refs.popup.open()
				})
			}
			return { style, fields, items, title, onSubmit, onClose, open }
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
</style>
