<template>
	<uni-popup ref="popup" type="dialog" v-if="visible">
		<uni-popup-dialog mode="base" :title="title" :before-close="true" @close="onClose" @confirm="onSubmit">
			<uni-forms :modelValue="form.fields" ref="form">
				<template v-for="(item, index) in form.items" :key="index">
					<uni-forms-item :label="item.label" :name="item.field">
						<uni-easyinput v-model="form.fields[item.field]" :type="item.inputType || 'text'" :placeholder="item.placeholder" v-if="item.type === 'input'" />
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
			const title = ref('表单')
			const visible = ref(false)
			const form = ref({
				fields: {},
				items: [],
				config: {}
			})
			let submit = () => {}
			const onClose = () => {
				proxy.$refs.popup.close()
				visible.value = false
			}
			const onSubmit = () => {
				submit(toRaw(form.value.fields))
				onClose()
			}
			const open = (_title, _form, _submit) => {
				title.value = _title
				form.value = _form
				if (typeof _submit === 'function') {
					submit = _submit
				}
				visible.value = true
				nextTick(() => {
					proxy.$refs.popup.open()
				})
			}
			return { title, visible, form, onSubmit, onClose, open }
		}
	}
</script>
<style scoped lang="scss"></style>
