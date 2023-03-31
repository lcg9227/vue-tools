<!-- gird -->
<template>
	<div class="grid">
		<template v-for="(item, index) in list" :key="index">
			<Item :style="{ width: itemWidth }" :title="item.title" :config="item" />
		</template>
	</div>
</template>

<script setup>
	import { defineProps, computed } from 'vue'
	import Item from './Item.vue'
	const props = defineProps({
		list: {
			type: Array,
			default: [
				{ title: '测试1', icon: 't_xiaoxi1', type: 'page', url: '' },
				{ title: '测试2', icon: 't_xiaoxi1', type: 'page', url: '' },
				{ title: '测试3', icon: 'c_wode1', type: 'page', url: '' },
				{ title: '测试4', icon: 'c_wode1', type: 'page', url: '' },
			],
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
