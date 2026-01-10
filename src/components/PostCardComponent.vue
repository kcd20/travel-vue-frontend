<script setup lang="ts">
import { dateTimeDisplayFormat } from '@/config/constants'
import type { PostResponseInterface } from '@/type/PostResponseInterface'
import dayjs from 'dayjs'
import { computed } from 'vue'
import truncate from 'truncate-html'
import DOMPurify from 'dompurify'

const props = defineProps<{
  firstPost: PostResponseInterface
}>()

const createdOn = dayjs(props.firstPost.createdOn).format(dateTimeDisplayFormat)

const previewHtml = computed(() => {
  const sanitized = DOMPurify.sanitize(props.firstPost.description, {
    FORBID_TAGS: ['img']
  })

  return truncate(sanitized, 30, { byWords: true })
})
</script>

<template>
  <article class="post">
    <div class="image-wrapper">
      <img class="cover-image" :src="firstPost.coverImage.url" />
    </div>
    <h2>{{ firstPost.title }}</h2>

    <div class="meta">
      <span>Posted on {{ createdOn }}</span>
    </div>

    <div v-html="previewHtml"></div>

    <div class="button-wrapper">
      <router-link class="action-button" :to="{ name: 'post', params: { id: firstPost._id } }"
        >View More</router-link
      >
    </div>
  </article>
</template>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 2.5rem;
}

.post:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

h2 {
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

.image-wrapper {
  display: flex;
  justify-content: center;
}

.cover-image {
  max-width: 550px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
