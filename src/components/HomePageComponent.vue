<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PostCardComponent from './PostCardComponent.vue'
import PostsListComponent from './PostListComponent.vue'
import SidebarComponent from './SidebarComponent.vue'
import type { PostResponseInterface } from '@/type/PostResponseInterface'
import axios from 'axios'
import { API_BASE } from '@/api/endpoints'
import { useMediaQuery } from '@vueuse/core'
import { VueSpinner } from 'vue3-spinners'

const latestPosts = ref<PostResponseInterface[]>([])
const error = ref('')
const firstPost = computed(() => latestPosts.value[0])
const secondToFourthPosts = computed(() => latestPosts.value.slice(1, 4))

const showSidebar = useMediaQuery('(min-width: 768px)')

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
      <PostCardComponent v-if="firstPost" :firstPost="firstPost" />
      <div class="spinner" v-else><VueSpinner size="75" color="#273fa3" /></div>
      <SidebarComponent v-if="showSidebar" />
    </div>

    <PostsListComponent v-if="secondToFourthPosts.length > 0" :postList="secondToFourthPosts" />
    <div class="spinner" v-else><VueSpinner size="75" color="#273fa3" /></div>
  </div>
</template>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

@media (max-width: 767px) {
  .top-content {
    display: block;
  }
}
</style>
