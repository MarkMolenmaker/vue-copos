import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import store from "@/store"
import router from "@/router"

import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.directive('focus', { mounted(el) { el.focus() } })
app.use(store).use(router).mount('#app')
