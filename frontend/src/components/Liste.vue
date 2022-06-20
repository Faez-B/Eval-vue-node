<script setup>
    import {ref} from "vue";
    import axios from 'axios';
    import * as jose from 'jose'

    const userId = ref("");
    
    if (localStorage.getItem("token")) {
        userId.value = (jose.decodeJwt(localStorage.getItem("token"))).id;
    }

    let objects = ref(null);
    let nom = ref("");

    axios.get(`http://localhost:8000/getAll/${userId.value}`)
        .then( (data) => {
            if (data.data.length) {
                objects.value = data.data
            }
        })
    ;

    function onSubmit() {
        if (nom.value) {
            console.log(userId.value);
            axios.post("http://localhost:8000/addOne", {  name: nom.value, userId : userId.value })
            .then( (res) => {
                // console.log(res);
                if (objects.value) {
                    objects.value.push({  
                        _id: res.data.id, 
                        name: res.data.payload.name, 
                        userId: res.data.payload.userId  
                    });
                }
                else {
                    objects.value = [{  
                        _id: res.data.id, 
                        name: res.data.payload.name, 
                        userId: res.data.payload.userId  
                    }]
                }
                nom.value = "";
            })
        }
    }

    function onDelete(id) {

    }
</script>

<template>
    <h1 class="text-center">
        Todolist
    </h1>

    <form @submit.prevent="onSubmit()">
        <input type="text" placeholder="Nom" v-model="nom">
        <button class="btn btn-success mx-2">
            Ajouter
        </button>
    </form>

    <p v-if="objects == null">
        Aucun todo trouvé
    </p>

    <ul v-else>
        <li v-for="object in objects" key="object.id">
            <button class="btn btn-danger m-2" @click.prevent="onDelete(object._id)">
                Supprimer
            </button>

            <RouterLink to="#">
                {{ object.name }}
            </RouterLink>
        </li>
    </ul>
</template>