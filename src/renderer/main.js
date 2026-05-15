import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale'
import _en from 'element-ui/lib/locale/lang/en'

const lang = localStorage.getItem('lang')
if (lang && lang !== 'en') {
	// Migrate legacy locale settings to English (only supported language)
	localStorage.setItem('lang', 'en')
}
locale.use(_en)

Vue.use(ElementUI)

import { en } from './lang'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: (localStorage.getItem('lang') || 'en'),
	messages: { en }
})


import router from './router'
import App from './App'

if (!process.env.IS_WEB) { Vue.use(require('vue-electron')) }
Vue.config.productionTip = false

import { openExternal, store, notify } from './plugins'
Vue.use(openExternal)
Vue.use(store)
Vue.use(notify)

import directives from './directives'
Vue.use(directives)

import { drag } from './mixin'

/* eslint-disable no-new */
const vue = new Vue({
	components: { App },
	router,
	i18n,
	mixins: [drag],
	template: '<App/>'
}).$mount('#app')

import menu from './components/menu'
menu(vue)
