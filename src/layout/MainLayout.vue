<template>
  <main class="layout">
    <slot />
  </main>
</template>

<style scoped>
.layout {
  padding: 0 7rem;
}

@media (max-width: 800px) {
  .layout {
    padding: 0 1.5rem;
  }
}
</style>
