import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/dist/locale/zh-cn.js'
import 'element-plus/dist/index.css'
// 路由
import router from '@/router'
// pinia
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

import App from './App.vue'

const pinia = createPinia()
const persist = createPersistedState()

pinia.use(persist)

const app = createApp(App)

app.use(ElementPlus,{ locale })
app.use(router)
app.use(pinia)

app.mount('#app')
