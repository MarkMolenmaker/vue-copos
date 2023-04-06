import {createRouter, createWebHashHistory} from 'vue-router'
import NotFoundMenu from "@/components/Menus/NotFoundMenu.vue";
import DefaultMenu from "@/components/Menus/DefaultMenu.vue";
import SupervisorMenu from "@/components/Menus/SupervisorMenu.vue";

const routes = [
    { path: '/', component: DefaultMenu },
    { path: '/supervisor_menu', component: SupervisorMenu },

    // 404 Not Found
    { path: '/:pathMatch(.*)*', component: NotFoundMenu }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router