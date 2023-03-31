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
			required: true,
		},
		fontSize: {
			type: Number,
			default: 36,
		},
	})
	const iconClass = computed(() => {
		let _class = 'iconfont ticon'
		if (props.type) {
			_class = `${_class} ticon-${props.type}`
		}
		return _class
	})
	const iconStyle = computed(() => {
		const _style = {
			fontSize: `${props.fontSize}rpx`,
		}
		return _style
	})
</script>

<style scoped>
	@import './iconfont.scss';
	.ticon {
		position: relative;
	}
</style>
