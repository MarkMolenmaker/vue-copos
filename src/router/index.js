import {createRouter, createWebHashHistory} from 'vue-router'

import NotFoundMenu from "@/components/Menus/NotFoundMenu.vue";
import DefaultMenu from "@/components/Menus/DefaultMenu.vue";
import SupervisorMenu from "@/components/Menus/SupervisorMenu.vue";
import AfrekenenMenu from "@/components/Menus/AfrekenenMenu.vue";

const routes = [
    { path: '/', component: DefaultMenu },
    { path: '/supervisor_menu', component: SupervisorMenu },
    { path: '/afrekenen', component: AfrekenenMenu },

    // Lazy loading
    { path: '/afmelden', component: () => import('@/components/Menus/ActionOnly/Afmelden.vue')  },

    // 404 Not Found
    { path: '/:pathMatch(.*)*', component: NotFoundMenu }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router