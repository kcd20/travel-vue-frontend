<template>
  <aside class="sidebar">
    <h3>Recent Posts</h3>

    <ul>
      <li v-for="post in posts" :key="post.title">
        <strong>{{ post.title }}</strong>
        <span>{{ post.date }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
const posts = [
  { title: 'Nothing Beats New York', date: 'January 23, 2018' },
  { title: 'Modest Dressing, as a Virtue', date: 'January 22, 2018' }
]
</script>

<style scoped>
.sidebar {
  border: 1px solid #ddd;
  padding: 1.5rem;
}

h3 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1.2rem;
}

span {
  display: block;
  font-size: 0.8rem;
  color: #777;
}
</style>
