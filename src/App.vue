<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import MainLayout from './layout/MainLayout.vue'
</script>

<template>
  <NavbarComponent />
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
