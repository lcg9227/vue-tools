<template>
	<view class="warp">
		<lcg-nav-bar title="兑换管理"></lcg-nav-bar>
		<uni-card title="积分管理" extra="">
			<text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
		</uni-card>
		<lcg-easy-form ref="easyForm"></lcg-easy-form>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				current: 0,
				userInfo: {},
				children: []
			}
		},
		onLoad() {
			this.userInfo = this.api.getUserInfo()
			this.getChildren()
		},
		methods: {
		}
	}
</script>

<style>
	.warp {
		position: relative;
	}
</style>
