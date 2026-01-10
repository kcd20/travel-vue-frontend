<script setup lang="ts">
import type { PostResponseInterface } from '@/type/PostResponseInterface'
import truncate from 'truncate-html'
import DOMPurify from 'dompurify'
import formatDateTimeDisplay from '@/utils/formatDateTimeDisplay'

defineProps<{
  postList: PostResponseInterface[]
}>()

const formatPreviewHtml = (descriptionHtml: string) => {
  const sanitized = DOMPurify.sanitize(descriptionHtml, {
    FORBID_TAGS: ['img'],
  })

  return truncate(sanitized, 30, { byWords: true })
}
</script>

<template>
  <section>
    <h1 class="title">More Posts</h1>
    <div class="posts-grid">
      <article v-for="post in postList" :key="post._id" class="post-card">
        <img :src="post.coverImage.url" :alt="post.title" />
        <h4>{{ post.title }}</h4>
        <p class="date">Posted on {{ formatDateTimeDisplay(post.createdOn) }}</p>
        <div class="description" v-html="formatPreviewHtml(post.description)"></div>
        <router-link class="action-button" :to="{ name: 'post', params: { id: post._id } }"
          >View More</router-link
        >
      </article>
    </div>
  </section>
</template>

<style scoped>
.posts-list {
  margin: 3rem auto;
}

.title {
  margin: 2rem 0;
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
  display: flex;
  flex-direction: column;
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

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
