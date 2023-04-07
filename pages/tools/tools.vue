<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		<!-- banner -->
		<!-- <unicloud-db ref="bannerdb" v-slot:default="{ data, loading, error, options }" collection="opendb-banner" field="_id,bannerfile,open_url,title" @load="onqueryload">
			<image v-if="!(loading || data.length)" class="banner-image" src="/static/uni-center/headers.png" mode="aspectFill" :draggable="false" />

			<swiper v-else class="swiper-box" @change="changeSwiper" :current="current" indicator-dots>
				<swiper-item v-for="(item, index) in data" :key="item._id">
					<view class="swiper-item" @click="clickBannerItem(item)">
						<image class="banner-image" :src="item.bannerfile.url" mode="aspectFill" :draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</unicloud-db> -->
		<!-- 宫格 -->
		<Title title="我的工具" />
		<unicloud-db ref="toolsdb" v-slot:default="{ data, loading, error, options }" :where="toolsWhere" collection="tool-list" @load="onqueryload">
			<Grid :list="data" />
		</unicloud-db>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar'
	// #endif
	import Title from '@/components/Title/Title.vue'
	import Grid from '@/components/Grid/Grid.vue'
	import { getUserInfo, hasLogin } from '@/common/pocket'
	export default {
		components: {
			// #ifdef APP-PLUS
			statusBar,
			// #endif
			Title,
			Grid
		},
		data() {
			return {
				current: 0,
				toolsWhere: ''
			}
		},
		onLoad() {
			this.toolsWhere = 'permissionType==0'
			if (hasLogin) {
				const userInfo = getUserInfo()
				console.log('当前登录信息>>>', userInfo)
				const { permission } = userInfo
				const _where = ` || (permissionType==1 && permission in ${JSON.stringify(permission)})`
				this.toolsWhere = `${this.toolsWhere}${_where}`
			}
			this.$nextTick(() => {
				this.$refs.toolsdb.loadData()
			})
		},
		methods: {
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					})
				}
				// 其余业务处理
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	/* #ifdef APP-NVUE */
	.warp {
		background-color: #fff;
	}
	/* #endif */

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.banner-image {
		width: 100%;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
	}
</style>
