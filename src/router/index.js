import {createRouter, createWebHashHistory} from 'vue-router'

import NotFoundMenu from "@/components/Menus/NotFoundMenu.vue";
import DefaultMenu from "@/components/Menus/DefaultMenu.vue";

const routes = [
    { path: '/', component: DefaultMenu },

    // Lazy loading
    { path: '/afmelden', component: () => import('@/components/Menus/ActionOnly/Afmelden.vue')  },
    { path: '/supervisor_menu', component: () => import('@/components/Menus/SupervisorMenu.vue') },
    { path: '/kassa_plus', component: () => import('@/components/Menus/KassaPLUsMenu.vue') },

    { path: '/afrekenen', component: () => import('@/components/Menus/AfrekenenMenu.vue') },
    { path: '/training', component: () => import('@/components/Menus/ActionOnly/Training.vue') },

    // Payment
    { path: '/pay_cash', component: () => import('@/components/Menus/ActionOnly/PayCash.vue') },
    { path: '/pay_pin', component: () => import('@/components/Menus/ActionOnly/PayPin.vue') },
    { path: '/pay_5_euros', component: () => import('@/components/Menus/ActionOnly/Payment/Pay5Euros.vue') },

    // 404 Not Found
    { path: '/:pathMatch(.*)*', component: NotFoundMenu }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router