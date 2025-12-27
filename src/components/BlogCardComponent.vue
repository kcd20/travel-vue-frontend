<script setup lang="ts">
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>

<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ excerpt }}</p>
    <router-link :to="`/post/${id}`">Read More</router-link>
  </div>
</template>
