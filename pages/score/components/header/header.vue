<template>
	<view class="header">
    <div class="b-between">
      <div class="info"></div>
      <u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80rpx" height="80rpx" shape="circle"></u--image>
    </div>
  </view>
</template>

<script>
	export default {
		props: {
			userInfo: {
				type: Object,
				default: {}
			}
		},
		components: {},
		data() {
			return {
			}
		},
		onLoad() {
      console.log('header onLoad >>>', this.userInfo);
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
    height: 370px;
    background-color: #69C98B;
    color: #fff;
	}
</style>
