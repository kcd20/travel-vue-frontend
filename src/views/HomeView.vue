<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostCardComponent from '../components/PostCardComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
</script>

<template>
  <div>
    <div class="top">
      <PostCardComponent />
      <SidebarComponent />
    </div>

    <PostsListComponent />
  </div>
</template>

<style>
.top {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}
</style>
