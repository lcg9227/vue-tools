<template>
	<!-- #ifdef APP-PLUS -->
	<statusBar :style="statusBarStyle"></statusBar>
	<!-- #endif -->
	<uni-nav-bar left-icon="left" :title="title" @clickLeft="back" v-if="title" />
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar'
	// #endif
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
      statusBarStyle: {
        type: Object,
        default: {}
      }
		},
		components: {
			// #ifdef APP-PLUS
			statusBar
			// #endif
		},
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			back() {
				uni.navigateBack(1, 'pop-out')
			}
		}
	}
</script>

<style lang="scss" scoped></style>
