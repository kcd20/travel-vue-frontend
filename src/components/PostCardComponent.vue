<script setup lang="ts">
import type { PostResponseInterface } from '@/type/PostResponseInterface';

defineProps<{
  firstPost: PostResponseInterface
}>()
</script>

<template>
  <article class="post">
    <h2>{{ firstPost.title }}</h2>

    <div class="meta">
      <span>Posted on {{ firstPost.createdOn }}</span>
      <!-- <span>by Sam Smith</span> -->
    </div>

    <p>
      {{ firstPost.description }}
    </p>
  </article>
</template>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 2.5rem;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 1.5rem;
}

p {
  line-height: 1.8;
  color: #444;
}
</style>
