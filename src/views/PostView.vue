<!-- <script setup lang="ts">
import { posts } from '@/data/posts'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = posts.find((p) => p.id === Number(route.params.id))
</script>

<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <router-link to="/">← Back</router-link>
  </div>
</template> -->
