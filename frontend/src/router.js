import { createWebHistory, createRouter } from "vue-router";
import LoginVue from "@/components/Login.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/connexion",
            name: "connexion",
            component: LoginVue
        },
    ]
})

export default router;