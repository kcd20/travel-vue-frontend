<script setup lang="ts">
import { posts } from '@/data/posts'
import BlogCard from '../components/BlogCardComponent.vue'
</script>

<template>
  <div>
    <h1>My Vue Blog</h1>
    <BlogCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :excerpt="post.excerpt"
    />
  </div>
</template>
