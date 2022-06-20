<script setup>
import Navbar from './components/Navbar.vue';

</script>

<template>
  <header>
      <Navbar/>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
</style>
