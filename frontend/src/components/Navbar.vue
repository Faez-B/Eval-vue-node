<script setup>
  import {ref} from "vue";

  import {useUserStore} from "@/services/userStore";

  const token = ref("");

  if (localStorage.getItem("token")) {
    token.value = localStorage.getItem("token");
  }

  const { user, deconnexion } = useUserStore();

  function logout() {
    deconnexion();
  }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          
          <li v-if="user" class="nav-item active"><RouterLink class="nav-link" :to="{name:'accueil'}">Accueil</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" :to="{name:'apropos'}">À propos</RouterLink></li>
          <li v-if="user" class="nav-item"><RouterLink class="nav-link" :to="{name:'todolist'}">Todolist</RouterLink></li>
          <!-- <li class="nav-item"><RouterLink class="nav-link" :to="{name:'todolist'}">Todolist</RouterLink></li> -->
          <li class="nav-item"><RouterLink class="nav-link" :to="{name:'auHasard'}">Au Hasard</RouterLink></li>

        </ul>

      </div>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item mx-2" v-if="!user">
          <RouterLink class="nav-link btn btn-success" :to="{name:'connexion'}">Connexion</RouterLink>
        </li>

        <li class="nav-item mx-2" v-if="!user">
          <RouterLink class="nav-link btn btn-primary" :to="{name:'inscription'}">Inscription</RouterLink>
        </li>

        <li class="nav-item mx-2" v-if="user">
          <RouterLink class="nav-link btn btn-danger" :to="{name:'connexion'}" @click="logout()">Déconnexion</RouterLink>
        </li>
      </ul>
    </nav>
</template>