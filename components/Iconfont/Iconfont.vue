<!-- iconfont -->
<template>
	<i :class="iconClass" :style="iconStyle"></i>
</template>

<script setup>
	import { defineProps, computed } from 'vue'
	const props = defineProps({
		type: {
			type: String,
			default: '',
			required: true
		},
		fontSize: {
			type: Number,
			default: 36
		},
		color: {
			type: String,
			default: ''
		}
	})
	const iconClass = computed(() => {
		let _class = props.type.includes('c_') ? 'ciconfont' : 'ticonfont'
		if (props.type) {
			_class = `${_class} ${props.type}`
		}
		return _class
	})
	const iconStyle = computed(() => {
		const _style = {
			fontSize: `${props.fontSize}rpx`
		}
		if (props.color) {
			_style.color = props.color
		}
		return _style
	})
</script>

<style scoped>
	@import './ticonfont/ticonfont.scss';
	@import './ciconfont/ciconfont.scss';
</style>
