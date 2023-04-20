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

    // 404 Not Found
    { path: '/:pathMatch(.*)*', component: NotFoundMenu }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router