<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PostCardComponent from './PostCardComponent.vue';
import PostsListComponent from './PostListComponent.vue';
import SidebarComponent from './SidebarComponent.vue';
import type { PostResponseInterface } from '@/type/PostResponseInterface';
import axios from 'axios';
import { API_BASE } from '@/api/endpoints';

const latestPosts = ref<PostResponseInterface[]>([])
const error = ref('')
const firstPost = computed(() => latestPosts.value[0])
const secondToFourthPosts = computed(() =>
  latestPosts.value.slice(1, 4)
)

onMounted(async () => {
  try {
    const { data } = await axios.get<PostResponseInterface[]>(`${API_BASE}/api/post/getLatestPosts`)
    latestPosts.value = data
  } catch {
    error.value = 'Failed to load posts'
  }
})
</script>

<template>
  <div>
    <div class="top-content">
      <PostCardComponent v-if="firstPost" :firstPost="firstPost"/>
      <SidebarComponent />
    </div>

    <PostsListComponent v-if="secondToFourthPosts" :postList="secondToFourthPosts"/>
  </div>
</template>

<style>
.top-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}
</style>
