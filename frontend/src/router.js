import { createWebHistory, createRouter } from "vue-router";
import LoginVue from "@/components/Login.vue";
import AccueilComponent from "@/components/Accueil.vue";
import RegisterComponent from "@/components/Register.vue";
import A_Propos from "@/components/A_Propos.vue";
import Todolist from "@/components/Liste.vue";
import Au_Hasard from "@/components/Au_Hasard.vue";
import DetailsTodoVue from "@/components/DetailsTodo.vue";


import {useUserStore} from "@/services/userStore";

const { user } = useUserStore();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "accueil",
            component: AccueilComponent,
            beforeEnter: (to, from) => {
                if (!user.value) return { name: "connexion" }
            }
        },

        {
            path: "/connexion",
            name: "connexion",
            component: LoginVue,
            beforeEnter: (to, from) => {
                if (user.value) return { name: "accueil" }
            }
        },

        {
            path: "/inscription",
            name: "inscription",
            component: RegisterComponent,
            beforeEnter: (to, from) => {
                if (user.value) return { name: "accueil" }
            }
        },

        {
            path: "/a-propos",
            name: "apropos",
            component: A_Propos
        },

        {
            path: "/todolist",
            name: "todolist",
            component: Todolist,
            beforeEnter: (to, from) => {
                if (!user.value) return { name: "connexion" }
            }
        },

        {
            path: "/au-hasard",
            name: "auHasard",
            component: Au_Hasard
        },

        {
            path: "/detailTodo/:id",
            name: "detailTodo",
            component: DetailsTodoVue
        }
    ]
})

export default router;