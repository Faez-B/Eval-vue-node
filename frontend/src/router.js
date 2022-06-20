import { createWebHistory, createRouter } from "vue-router";
import LoginVue from "@/components/Login.vue";
import AccueilComponent from "@/components/Accueil.vue";
import RegisterComponent from "@/components/Register.vue";
import A_Propos from "@/components/A_Propos.vue";
import Todolist from "@/components/Liste.vue";
import Au_Hasard from "@/components/Au_Hasard.vue";

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

        {
            path: "/a-propos",
            name: "apropos",
            component: A_Propos
        },

        {
            path: "/todolist",
            name: "todolist",
            component: Todolist
        },

        {
            path: "/au-hasard",
            name: "auHasard",
            component: Au_Hasard
        }
    ]
})

export default router;