<script setup lang="ts">
import { API_BASE } from '@/api/endpoints';
import PostListComponent from '@/components/PostListComponent.vue';
import type { PostResponseInterface } from '@/type/PostResponseInterface';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const allPosts = ref<PostResponseInterface[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get<PostResponseInterface[]>(`${API_BASE}/post/getAllPosts`)
    allPosts.value = data
  } catch {
    error.value = 'Failed to load posts'
  }
})
</script>

<template>
  <div>
    <PostListComponent :postList="allPosts"/>
    <router-link to="/">← Back</router-link>
  </div>
</template>
