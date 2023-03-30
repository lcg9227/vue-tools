<template>
	<view class="center">
		<view class="userInfo" @click.capture="toUserInfo">
			<cloud-image width="150rpx" height="150rpx" v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image>

			<view v-else class="defaultAvatarUrl">
				<uni-icons color="#ffffff" size="50" type="person-filled" />
			</view>

			<view class="logo-title">
				<text class="uer-name" v-if="hasLogin">{{ userInfo.nickname || userInfo.username || userInfo.mobile }}</text>
				<text class="uer-name" v-else>{{ $t('mine.notLogged') }}</text>
			</view>
		</view>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item, index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
				<text class="text">{{ item.text }}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" v-for="(sublist, index) in ucenterList" :key="index">
			<uni-list-item
				v-for="(item, i) in sublist"
				:title="item.title"
				link
				:rightText="item.rightText"
				:key="i"
				:clickable="true"
				:to="item.to"
				@click="ucenterListClick(item)"
				:show-extra-icon="true"
				:extraIcon="{ type: item.icon, color: '#999' }">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{ item.rightText }}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version'
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js'
	const uniShare = new UniShare()
	// #endif
	const db = uniCloud.database()
	import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		// #ifdef APP
		onBackPress({ from }) {
			if (from == 'backbutton') {
				this.$nextTick(function () {
					uniShare.hide()
				})
				return uniShare.isShow
			}
		},
		// #endif
		data() {
			return {
				gridList: [
					// {
					// 	text: this.$t('mine.showText'),
					// 	icon: 'chat',
					// },
					// {
					// 	text: this.$t('mine.showText'),
					// 	icon: 'cloud-upload',
					// },
					// {
					// 	text: this.$t('mine.showText'),
					// 	icon: 'contact',
					// },
					// {
					// 	text: this.$t('mine.showText'),
					// 	icon: 'download',
					// },
				],
				ucenterList: [
					[
						{
							title: this.$t('mine.readArticles'),
							to: '/pages/ucenter/read-news-log/read-news-log',
							icon: 'flag',
						},
					],
					[
						{
							title: this.$t('mine.feedback'),
							to: '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
							icon: 'help',
						},
						{
							title: this.$t('mine.settings'),
							to: '/pages/ucenter/settings/settings',
							icon: 'gear',
						},
					],
					// #ifdef APP-PLUS
					[
						{
							title: this.$t('mine.about'),
							to: '/pages/ucenter/about/about',
							icon: 'info',
						},
					],
					// #endif
				],
				listStyles: {
					height: '150rpx', // 边框高度
					width: '150rpx', // 边框宽度
					border: {
						// 如果为 Boolean 值，可以控制边框显示与否
						color: '#eee', // 边框颜色
						width: '1px', // 边框宽度
						style: 'solid', // 边框样式
						radius: '100%', // 边框圆角，支持百分比
					},
				},
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			// this.ucenterList[this.ucenterList.length - 2].unshift({
			// 	title:this.$t('mine.checkUpdate'),// this.this.$t('mine.checkUpdate')"检查更新"
			// 	rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
			// 	event: 'checkVersion',
			// 	icon: 'loop',
			// 	showBadge: this.appVersion.hasNew
			// })
			//#endif
		},
		onShow() {},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			},
			// #ifdef APP-PLUS
			appVersion() {
				return getApp().appVersion
			},
			// #endif
			appConfig() {
				return getApp().globalData.config
			},
		},
		methods: {
			toSettings() {
				uni.navigateTo({
					url: '/pages/ucenter/settings/settings',
				})
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]()
				}
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res)
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					})
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
				})
			},
			tapGrid(index) {
				uni.showToast({
					// title: '你点击了，第' + (index + 1) + '个',
					title: this.$t('mine.clicked') + ' ' + (index + 1),
					icon: 'none',
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}
	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		// padding: 20rpx;
		padding-top: 60px;
		background-image: url(../../static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
	}
	.defaultAvatarUrl {
		width: 150rpx;
		height: 150rpx;
		background-color: #007aff;
		border-radius: 100%;
		justify-content: center;
		align-items: center;
	}

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.uer-name {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #ffffff;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #007aff;
		height: 40rpx;
	}

	.grid {
		background-color: #ffffff;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 16px;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}

	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list ::v-deep .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list ::v-deep .uni-list--border-top,
	.center-list ::v-deep .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #dd524d;
	}
</style>
