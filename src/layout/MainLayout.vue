<template>
  <main class="layout">
    <slot />
  </main>
</template>

<style scoped>
.layout {
  padding: 0 5rem;
}

@media (max-width: 640px) {
  .layout {
    padding: 0 1.5rem;
  }
}
</style>
