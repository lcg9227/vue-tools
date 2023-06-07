import App from './App'
import * as pocket from './common/pocket'
import * as api from './common/api'
import * as dataConfig from './common/dataConfig'
import './components/lcg-iconfont/index.css'

const config = {
	globalProperties: { pocket, api, dataConfig },
	errorHandler: (err, vm, info) => console.error(err)
}
// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
Object.assign(app.config, config)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	Object.assign(app.config, config)
	return { app }
}
// #endif
