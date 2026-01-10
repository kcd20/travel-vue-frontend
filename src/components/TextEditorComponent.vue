<script setup lang="ts">
import type Quill from 'quill'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
import { ref } from 'vue'

const content = defineModel<string>()
const loading = ref(false)

// Replace these with your actual Cloudinary info
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET // unsigned preset

// Upload a file to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData)
  return response.data.secure_url
}

// Handle paste events in Quill
function onReady(quill: Quill) {
  quill.root.addEventListener('paste', async (e: ClipboardEvent) => {
    if (!e.clipboardData) return

    const items = e.clipboardData.items
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault() // stop default paste

        const file = item.getAsFile()
        if (!file) continue

        loading.value = true
        try {
          const url = await uploadToCloudinary(file)
          const range = quill.getSelection(true)
          quill.insertEmbed(range.index, 'image', url, 'user')
          quill.setSelection(range.index + 1)
        } catch {
          alert('Failed to upload image.')
        } finally {
          loading.value = false
        }
      }
    }
  })
}
</script>

<template>
  <div>
    <QuillEditor v-model:content="content" theme="snow" content-type="html" @ready="onReady" />
    <div v-if="loading" class="loading-indicator">Uploading image…</div>
  </div>
</template>

<style scoped>
:deep(.ql-editor) {
  min-height: 10rem;
}

.loading-indicator {
  margin-top: 0.5rem;
  font-style: italic;
}
</style>
