<script setup lang="ts">
import { dateTimeDisplayFormat } from '@/config/constants'
import type { PostResponseInterface } from '@/type/PostResponseInterface'
import dayjs from 'dayjs'
import truncate from 'truncate-html'
import DOMPurify from 'dompurify'

defineProps<{
  postList: PostResponseInterface[]
}>()

const formatDateTime = (dateTime: string) => {
  return dayjs(dateTime).format(dateTimeDisplayFormat)
}

const formatPreviewHtml = (descriptionHtml: string) => {
  return truncate(DOMPurify.sanitize(descriptionHtml), 20, { byWords: true })
}
</script>

<template>
  <section>
    <h1 class="title">More Posts</h1>
    <div class="posts-grid">
      <article v-for="post in postList" :key="post._id" class="post-card">
        <img :src="post.coverImage.url" :alt="post.title" />
        <h4>{{ post.title }}</h4>
        <p class="date">Posted on {{ formatDateTime(post.createdOn) }}</p>
        <div class="description" v-html="formatPreviewHtml(post.description)"></div>
        <button class="view-more">View More</button>
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

.view-more {
  background-color: #273fa3;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: auto;
  align-self: end;
}
</style>
