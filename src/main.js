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

router.options.scrollBehavior = function (to, from, savedPosition) {
    const fromHistory = Boolean(savedPosition)
    if (fromHistory && store.getters["routerHistory/length"] > 0)
        store.dispatch("routerHistory/splice")
    else store.dispatch("routerHistory/push", from)
    return savedPosition || { x:0, y:0 }
}

app.use(store).use(router).mount('#app')
