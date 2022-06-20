<script setup>

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          
          <li class="nav-item active"><RouterLink class="nav-link" :to="{name:'accueil'}">Accueil</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" :to="{name:'apropos'}">À propos</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" :to="{name:'todolist'}">Todolist</RouterLink></li>

        </ul>

      </div>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item mx-2">
          <RouterLink class="nav-link btn btn-success" :to="{name:'connexion'}">Connexion</RouterLink>
        </li>

        <li class="nav-item mx-2">
          <RouterLink class="nav-link btn btn-primary" :to="{name:'inscription'}">Inscription</RouterLink>
        </li>
      </ul>
    </nav>
</template>