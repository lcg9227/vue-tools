<template>
	<uni-popup ref="popup" type="top" v-if="visible">
		<div class="popup" :style="style">111</div>
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
        paddingTop,
      })
			console.log('win info >>>', winInfo)
			const title = ref('')
			const visible = ref(false)
			const fields = ref({})
			const items = ref([])
			let submit = () => {}
			const onClose = () => {
				proxy.$refs.popup.close()
				visible.value = false
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
				visible.value = true
				nextTick(() => {
					proxy.$refs.popup.open()
				})
			}
			return { style, fields, items, title, visible, onSubmit, onClose, open }
		}
	}
</script>
<style scoped lang="scss">
	.popup {
		min-height: 400rpx;
		background-color: #fff;
	}
</style>
