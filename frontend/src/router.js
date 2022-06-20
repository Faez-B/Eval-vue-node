import { createWebHistory, createRouter } from "vue-router";
import LoginVue from "@/components/Login.vue";
import AccueilComponent from "@/components/Accueil.vue";
import RegisterComponent from "@/components/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "accueil",
            component: AccueilComponent
        },

        {
            path: "/connexion",
            name: "connexion",
            component: LoginVue
        },

        {
            path: "/inscription",
            name: "inscription",
            component: RegisterComponent
        },
    ]
})

export default router;