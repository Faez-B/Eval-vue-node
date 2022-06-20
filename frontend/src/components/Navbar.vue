<script setup>

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          
          <li class="nav-item active"><RouterLink class="nav-link" to="/">Accueil</RouterLink></li>

        </ul>

      </div>

      <ul class="navbar-nav mr-auto">
        <li v-if="!user" class="nav-item">
          <RouterLink class="nav-link btn btn-success" :to="{name:'connexion'}">Connexion</RouterLink>
        </li>
      </ul>
    </nav>
</template>