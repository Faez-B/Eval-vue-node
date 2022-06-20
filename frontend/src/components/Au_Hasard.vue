<script setup>
    import axios from 'axios';
    import {ref} from "vue";

    const data = ref(null);

    // axios.get("http://localhost:8080/random")
    //     .then( (res) => {
    //         data = res.data;
    //     })
    // ;
</script>

<template>
    <h1 class="text-center">
        Page au Hasard
    </h1>

    {{ data }}

</template>