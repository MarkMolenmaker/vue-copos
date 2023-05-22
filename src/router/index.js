import {createRouter, createWebHashHistory} from 'vue-router'

import NotFoundMenu from "@/components/Menus/NotFoundMenu.vue";
import DefaultMenu from "@/components/Menus/DefaultMenu.vue";
import store from "@/store";

const routes = [
    { path: '/', component: DefaultMenu },

    // Lazy loading
    { path: '/supervisor_menu', component: () => import('@/components/Menus/SupervisorMenu.vue') },
    { path: '/kassa_plus', component: () => import('@/components/Menus/KassaPLUsMenu.vue') },
    { path: '/afrekenen', component: () => import('@/components/Menus/AfrekenenMenu.vue') },

    // 404 Not Found
    { path: '/:pathMatch(.*)*', component: NotFoundMenu }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    switch (to.path) {
        case '/afmelden':
            store.dispatch("session/logout")
                .then(() => next('/'))
            return
        case '/training':
            store.dispatch("checkout/toggleTrainingMode")
                // Go back to the menu before the training menu
                .then(() => next(from.path))
            return
        case '/pay_cash':
            store.dispatch("session/continue")
                .then(() => {})
            return
        case '/pay_pin':
            store.dispatch("session/continue")
                .then(() => {})
            return
        case '/pay_5_euros':
            store.dispatch("checkout/makePayment", {type: "Contant", value: "5"})
                .then(() => {})
            return
        case '/pay_10_euros':
            store.dispatch("checkout/makePayment", {type: "Contant", value: "10"})
                .then(() => {})
            return
        case '/pay_20_euros':
            store.dispatch("checkout/makePayment", {type: "Contant", value: "20"})
                .then(() => {})
            return
        case '/pay_50_euros':
            store.dispatch("checkout/makePayment", {type: "Contant", value: "50"})
                .then(() => {})
            return
        case '/pay_100_euros':
            store.dispatch("checkout/makePayment", {type: "Contant", value: "100"})
                .then(() => {})
            return
        case '/lade_open':
            store.dispatch("vault/open")
                .then(() => {})
            return
    }
    next()
})

export default router