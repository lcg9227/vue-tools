<template>
	<view class="content">
		<!-- 功能列表 -->
		<uni-list class="mt10" :border="false">
			<uni-list-item title="账号资料" to="/uni_modules/uni-id-pages/pages/userinfo/userinfo" link="navigateTo"></uni-list-item>
			<uni-list-item
				v-if="userInfo.mobile"
				title="修改密码"
				:to="'/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber=' + userInfo.mobile"
				link="navigateTo"></uni-list-item>
		</uni-list>
		<uni-list class="mt10" :border="false">
			<!-- #ifndef H5 -->
			<!-- #ifdef APP-PLUS -->
			<!-- 检查push过程未结束不显示，push设置项 -->
			<uni-list-item title="清理缓存" @click="clearTmp" link></uni-list-item>
			<uni-list-item v-show="pushIsOn != 'wait'" title="推送功能" @click.native="pushIsOn ? pushServer.off() : pushServer.on()" showSwitch :switchChecked="pushIsOn"></uni-list-item>
			<!-- #endif -->
			<uni-list-item v-if="supportMode.includes('facial')" title="人脸解锁" @click="startSoterAuthentication('facial')" link></uni-list-item>
			<!-- #endif -->
		</uni-list>

		<!-- 退出/登录 按钮 -->
		<view class="bottom-back" @click="changeLoginState">
			<text class="bottom-back-text" v-if="hasLogin">{{ '退出登录' }}</text>
			<text class="bottom-back-text" v-else>{{ '登录' }}</text>
		</view>
	</view>
</template>

<script>
	import pushServer from './dc-push/push.js'
	import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				pushServer: pushServer,
				supportMode: [],
				pushIsOn: 'wait',
				userInfo: {}
			}
		},
		computed: {
			hasLogin() {
				return store.hasLogin
			}
		},
		onLoad() {

			uni.setNavigationBarTitle({
				title: '设置'
			})
		},
		onShow() {
			// 检查手机端获取推送是否开启
			//#ifdef APP-PLUS
			setTimeout(() => {
				this.pushIsOn = pushServer.isOn()
			}, 300)
			//#endif
		},
		methods: {
			async changeLoginState() {
				if (this.hasLogin) {
					await mutations.logout()
				} else {
					uni.redirectTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
					})
				}
			},
			clearTmp() {
				uni.showLoading({
					title: '清除中',
					mask: true
				})
				/*
				任何临时存储或删除不直接影响程序运行逻辑（清除缓存必定造成业务逻辑的变化，如：打开页面的图片不从缓存中读取而从网络请求）的内容都可以视为缓存。主要有storage、和file写入。
				缓存分为三部分		
					原生层（如：webview、x5播放器的、第三方sdk的、地图组件等）
					前端框架（重启就会自动清除）
					开发者自己的逻辑（如：
						本示例的 检测更新功能下载了apk安装包，
						其他逻辑需要根据开发者自己的业务设计
						比如：有聊天功能的应用，聊天记录是否视为缓存，还是单独提供清除聊天记录的功能由开发者自己设计
					）
				*/
				uni.getSavedFileList({
					success: res => {
						if (res.fileList.length > 0) {
							uni.removeSavedFile({
								filePath: res.fileList[0].filePath,
								complete: res => {
									console.log(res)
									uni.hideLoading()
									uni.showToast({
										title: '清除成功',
										icon: 'none'
									})
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '清除成功',
								icon: 'none'
							})
						}
					},
					complete: e => {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	uni-button:after {
		border: none;
		border-radius: 0;
	}
	/* #endif */
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 750rpx;
		height: 100vh;
		/* #endif */
		flex-direction: column;
		flex: 1;
		background-color: #f9f9f9;
	}

	.bottom-back {
		margin-top: 10px;
		width: 750rpx;
		height: 44px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		border-width: 0;
		border-radius: 0;
		background-color: #ffffff;
	}

	.bottom-back-text {
		font-size: 33rpx;
	}

	.mt10 {
		margin-top: 10px;
	}
	/* #ifndef APP-NVUE  || VUE3 */
	.content ::v-deep .uni-list {
		background-color: #f9f9f9;
	}
	.content ::v-deep .uni-list-item--disabled,
	.list-item {
		height: 50px;
		margin-bottom: 1px;
	}
	/* #endif */
</style>
