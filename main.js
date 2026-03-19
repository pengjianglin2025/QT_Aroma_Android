import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
import messages from './locale/index'

let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)


Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.back = function(){
	console.log('返回');
	uni.navigateBack()
}

App.mpType = 'app'

const app = new Vue({
	i18n,
  ...App
})

app.$mount()
