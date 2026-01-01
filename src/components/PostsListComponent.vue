<script setup lang="ts">
import type { PostResponseInterface } from '@/type/PostResponseInterface';

defineProps<{
  secondToFourthPosts: PostResponseInterface[]
}>()
</script>

<template>
  <section class="posts-list">
    <h3>More Posts</h3>
    <div class="posts-grid">
      <article v-for="post in secondToFourthPosts" :key="post._id" class="post-card">
        <img :src="post.coverImage" :alt="post.title" />
        <h4>{{ post.title }}</h4>
        <p class="date">{{ post.createdOn }}</p>
        <p class="description">{{ post.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.posts-list {
  margin: 3rem auto;
}

.posts-list h3 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.posts-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.post-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
  background: #fff;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

.post-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.post-card h4 {
  margin: 0 0 0.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
}

.date {
  color: #777;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.description {
  color: #444;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
