<script setup lang="ts">
import { API_BASE } from '@/api/endpoints';
import PostListComponent from '@/components/PostListComponent.vue';
import type { PostResponseInterface } from '@/type/PostResponseInterface';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { VueSpinner } from 'vue3-spinners'

const allPosts = ref<PostResponseInterface[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get<PostResponseInterface[]>(`${API_BASE}/api/post/getAllPosts`)
    allPosts.value = data
  } catch {
    error.value = 'Failed to load posts'
  }
})
</script>

<template>
  <div>
    <PostListComponent v-if="allPosts.length > 0" :postList="allPosts"/>
     <div class="spinner" v-else><VueSpinner size="75" color="#273fa3" /></div>
  </div>
</template>
