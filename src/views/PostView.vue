<script setup lang="ts">
import { API_BASE } from '@/api/endpoints'
import type { PostResponseInterface } from '@/type/PostResponseInterface'
import formatDateTimeDisplay from '@/utils/formatDateTimeDisplay'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DOMPurify from 'dompurify'

const route = useRoute()
const postId = route.params.id as string
const post = ref<PostResponseInterface>()
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get<PostResponseInterface>(
      `${API_BASE}/api/post/getPost/${postId}`,
    )
    post.value = data
  } catch {
    error.value = 'Failed to load post'
  }
})
</script>

<template>
  <div class="card-wrapper">
    <article class="post-card" v-if="post">
      <img :src="post.coverImage.url" :alt="post.title" />
      <h1>{{ post.title }}</h1>
      <p class="date">Posted on {{ formatDateTimeDisplay(post.createdOn) }}</p>
      <div class="description" v-html="DOMPurify.sanitize(post.description)"></div>
    </article>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
}

.post-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

.post-card img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.date {
  color: #777;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.description :deep(img) {
  display: block;
  margin: 1rem auto;
  max-width: 100%;
  height: auto;
}

@media (max-width: 1440px) {
  .post-card {
    width: 70%;
  }
}

@media (max-width: 1024px) {
  .post-card {
    width: 100%;
  }
}
</style>
