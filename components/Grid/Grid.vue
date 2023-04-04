<!-- gird -->
<template>
	<div class="grid">
		<template v-for="(item, index) in list" :key="index">
			<Item :style="{ width: itemWidth }" :title="item.name" :config="item" />
		</template>
	</div>
</template>

<script setup>
	import { defineProps, computed } from 'vue'
	import Item from './Item.vue'
	const props = defineProps({
		list: {
			type: Array,
			default: [],
		},
		column: {
			type: Number,
			default: 4,
		},
	})
	const itemWidth = computed(() => {
		return `${100 / props.column}%`
	})
</script>

<style scoped lang="scss">
	.grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0 30rpx;
	}
</style>
