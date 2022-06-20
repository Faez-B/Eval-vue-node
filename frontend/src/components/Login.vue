<script setup>
    import {ref} from 'vue';

    import axios from 'axios';

    const name = ref("");
    const email = ref("");
    const mdp = ref("");

    const token = ref("");

    function onSubmit() {
        if (email.value && mdp.value) {
            axios.post("http://localhost:8000/signin", {
                email: email.value,
                password: mdp.value
            })
            .then((res) => {
                token.value = res.data;
                localStorage.setItem("token", token.value);
            })
        }
    }

</script>

<template>
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
