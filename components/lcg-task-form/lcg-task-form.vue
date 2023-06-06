<template>
	<uni-popup ref="popup" type="bottom" v-if="visible"> </uni-popup>
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
			return { fields, items, title, visible, onSubmit, onClose, open }
		}
	}
</script>
<style scoped lang="scss"></style>
