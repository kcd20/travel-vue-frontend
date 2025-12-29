<script setup lang="ts">
const menu = [
  'Prefectures',
  'Rail Passes',
]
</script>

<template>
  <header class="header">
    <h1>Japan Travel Itineraries</h1>
    <nav>
      <a v-for="item in menu" :key="item">{{ item }}</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  padding: 2.5rem 1rem;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

nav {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

nav a {
  margin: 0 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  cursor: pointer;
  color: #222;
}
</style>
