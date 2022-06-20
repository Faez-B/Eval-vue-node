<script setup>
    import {ref} from 'vue';
    import {useUserStore} from "@/services/userStore";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const name = ref("");
    const email = ref("");
    const mdp = ref("");

    const token = ref("");

    const { connexion } = useUserStore();

    function onSubmit() {
        if (email.value && mdp.value) {
            connexion({
                email: email.value,
                mdp: mdp.value
            });
            router.push("/");
        }
    }

</script>

<template>
    <h1 class="text-center">
        Connexion
    </h1>

    <form @submit.prevent="onSubmit()">
        <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Votre nom" v-model="name">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Votre email" v-model="email">
        </div>

        <div class="form-group">
            <label for="email">Mot de passe</label>
            <input type="password" class="form-control" id="email" placeholder="Mot de passe" v-model="mdp">
        </div>
        
        <div class="mt-2">
            <button type="submit" class="btn btn-success">Connexion</button>
        </div>
    </form>
</template>
