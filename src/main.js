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
    if (fromHistory && store.state.routerHistory.length > 0)
        store.state.routerHistory.splice(-1, 1);
    else store.state.routerHistory.push(from)
    console.log(store.state.routerHistory)
    return savedPosition || { x:0, y:0 }
}

app.use(store).use(router).mount('#app')
