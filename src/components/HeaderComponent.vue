<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const returnToHomePage = () => {
  router.push('/')
}
const menu = [
  { displayText: 'View All Posts', route: '/posts', variant: 'link' },
  { displayText: 'Create a New Post', route: '/new-post', variant: 'button' },
]
</script>

<template>
  <header class="header">
    <h1 class="home" @click="returnToHomePage">Japan Travel Itineraries</h1>
    <nav class="nav">
      <router-link
        class="router"
        v-for="item in menu"
        :key="item.displayText"
        :to="item.route"
        :class="item.variant === 'button' ? 'router--button' : 'router--link'"
        >{{ item.displayText }}</router-link
      >
    </nav>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  padding: 2rem 1rem;
}

.home {
  cursor: pointer;
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.nav {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router {
  margin: 0 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  cursor: pointer;
  color: #222;
  text-decoration: none;
}

.router--link:hover {
  text-decoration: underline;
}

.router--button {
  padding: 0.6rem 1.2rem;
  border: 1px solid #222;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
  background-color: #273fa3;
  color: #ffffff;
}

.router--button:hover {
  background-color: #1f3184;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .home {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
  }

  .router {
    display: block;
    margin: 0;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }

  .router--button {
    width: 50%;
    text-align: center;
  }
}
</style>
