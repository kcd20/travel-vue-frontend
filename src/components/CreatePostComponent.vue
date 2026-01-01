<script setup lang="ts">
import { ref } from 'vue'
import TextEditorComponent from './TextEditorComponent.vue'

const title = ref('')
const content = ref('')

function handleSubmit() {
  const payload = {
    title: title.value,
    description: content.value,
  }
  console.log('Form submitted:', payload)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="title-container">
      <label for="title">Title:</label>
      <input class="title" v-model="title" type="text" placeholder="Enter a title" />
    </div>

    <div class="title-container">
      <label for="title">Title:</label>
      <input type="file" accept="image/*" />
    </div>

    <div class="title-container">
      <label class="block font-medium mb-1">Description:</label>
      <TextEditorComponent v-model="content" />
    </div>

    <button type="submit" class="submit">Submit</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.title-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.title {
  height: 1.5rem;
}
.submit {
  width: min-content;
}
</style>
