<script setup>

    import { useRoute } from "vue-router";
    import {ref} from "vue";
    import axios from "axios";
    import { useRouter } from "vue-router";

    const route = useRoute();

    const router = useRouter();

    const objectId = route.params.id;

    const object = ref(null);
    const newName = ref("");

    if (objectId) {
        axios({
            method: 'get',
            url: `http://localhost:8000/getOne/${objectId}`
        }).then( (res) => {
            object.value = res.data;
            newName.value = object.value.name;
        })
    }

    function onSubmit() {
        axios.put("http://localhost:8000/updateOne", { 
            id : objectId,
            name : newName.value
        })
        .then((res) => {
            console.log(res.data)
        });

    }

    function annuler() {
        router.push("/todolist");
    }
</script>

<template>
    <h1 class="text-center">
        Détails Todo
    </h1>

    <form @submit.prevent="onSubmit()" class="my-2">
        <input type="text" v-model="newName" placeholder="Nouveau nom" name="newName">

        <div>
            <button class="my-2 btn btn-warning">
                Update
            </button>

            <button class="m-2 btn btn-danger" @click.prevent="annuler()">
                Annuler
            </button>
        </div>
    </form>
</template>