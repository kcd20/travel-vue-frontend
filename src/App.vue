<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
// import Hero from './components/Hero.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main class="container">
    <router-view />
  </main>
  <FooterComponent />
</template>
