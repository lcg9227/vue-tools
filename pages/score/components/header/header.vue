<template>
	<div class="header">
    <div class="b-between">
      <div class="info">111</div>
      <div class="image">12212</div>
    </div>
  </div>
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
    height: 370rpx;
    background-color: #69C98B;
    color: $uni-text-color-inverse; 
    padding: 20rpx 40rpx 0 40rpx;
	}
</style>
