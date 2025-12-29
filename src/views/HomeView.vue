<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostCardComponent from '../components/PostCardComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
</script>

<template>
  <div>
    <PostCardComponent />
    <SidebarComponent />

    <PostsListComponent />
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    margin: 2rem 1rem;
  }
}
</style>
