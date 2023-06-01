<template>
	<uni-popup ref="popup" type="dialog" v-if="visible">
		<uni-popup-dialog mode="base" :title="title" :before-close="true" @close="onClose" @confirm="onSubmit">
			<uni-forms :model="fields" ref="form">
				<template v-for="(item, index) in items" :key="index">
					<uni-forms-item :label="item.label" :name="item.field">
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
			const visible = ref(false)
			const fields = ref({})
			const items = ref([])
			let submit = () => {}
			const onClose = () => {
				proxy.$refs.popup.close()
				visible.value = false
			}
			const onSubmit = () => {
				submit(toRaw(fields.value))
				onClose()
			}
			const open = (_title, _form, _submit) => {
				title.value = _title || '表单'
				fields.value = _form.fields
				items.value = _form.items
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
