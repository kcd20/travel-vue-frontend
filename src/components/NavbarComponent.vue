<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <RouterLink to="/">Japan Travel</RouterLink>
    </div>

    <ul class="nav-links" :class="{ open: isOpen }">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>

    <button class="menu-btn" @click="isOpen = !isOpen">☰</button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1f2937;
  color: white;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid #3b82f6;
}

.menu-btn {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Mobile */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 64px;
    right: 0;
    background: #1f2937;
    flex-direction: column;
    width: 200px;
    padding: 1rem;
    display: none;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
