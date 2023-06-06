<template>
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog mode="base" type="info" :title="title" :before-close="true" @close="onClose" @confirm="onSubmit">
			<uni-forms :model="fields" ref="form">
				<template v-for="(item, index) in items" :key="index">
					<uni-forms-item :label="item.label" :name="item.field" :required="item.required" :rules="item.rules">
						<uni-easyinput v-model="fields[item.field]" :type="item.inputType || 'text'" :placeholder="item.placeholder" trim clearSize="16" v-if="item.type === 'input'" />
					</uni-forms-item>
				</template>
			</uni-forms>
		</uni-popup-dialog>
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
			const title = ref('')
			const fields = ref({})
			const items = ref([])
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
			const open = (_title, _form, _submit) => {
				title.value = _title || '表单'
				fields.value = _form.fields
				items.value = _form.items.map(v => {
					if (v.required === true) {
						v.rules = [{ required: true, errorMessage: `${v.label}不可为空!` }, ...(v.rules || [])]
					}
					return v
				})
				if (typeof _submit === 'function') {
					submit = _submit
				}
				nextTick(() => {
					proxy.$refs.popup.open()
				})
			}
			return { fields, items, title, onSubmit, onClose, open }
		}
	}
</script>
<style scoped lang="scss"></style>
