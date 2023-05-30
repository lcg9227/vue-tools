<script>
	import initApp from '@/common/appInit.js'
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js'
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
		},
		onLaunch: function () {
			console.log('App Launch')
			initApp()
			uniIdPageInit()
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
