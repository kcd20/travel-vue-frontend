<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const content = defineModel<string>()
</script>

<template>
  <div>
    <QuillEditor v-model:content="content" theme="snow" content-type="html" />
  </div>
</template>

<style scoped>
:deep(.ql-editor) {
  min-height: 10rem;
}
</style>
