<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
// import Hero from './components/Hero.vue'
import FooterComponent from './components/FooterComponent.vue'
import MainLayout from './layout/MainLayout.vue';
</script>

<template>
  <HeaderComponent />
  <MainLayout>
    <router-view />
  </MainLayout>
  <FooterComponent />
</template>
