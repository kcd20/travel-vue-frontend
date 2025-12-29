<template>
  <section class="posts-list">
    <h3>More Posts</h3>
    <div class="posts-grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <img :src="post.image" :alt="post.title" />
        <h4>{{ post.title }}</h4>
        <p class="date">{{ post.date }}</p>
        <p class="excerpt">{{ post.excerpt }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: 'Exploring the Mountains',
    date: 'March 10, 2018',
    excerpt: 'A thrilling adventure through the mountain trails.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 2,
    title: 'City Lights at Night',
    date: 'February 28, 2018',
    excerpt: 'Discovering the charm of the city after dark.',
    image: 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 3,
    title: 'Beach Life and Sunshine',
    date: 'January 15, 2018',
    excerpt: 'Relaxing on the sandy shores with ocean views.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=60'
  }
]
</script>

<style scoped>
.posts-list {
  margin: 3rem auto;
  max-width: 1200px;
}

.posts-list h3 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.posts-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.post-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
  background: #fff;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
}

.post-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.post-card h4 {
  margin: 0 0 0.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
}

.date {
  color: #777;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.excerpt {
  color: #444;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
