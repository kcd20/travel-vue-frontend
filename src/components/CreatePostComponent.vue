<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import TextEditorComponent from './TextEditorComponent.vue'
import axios from 'axios'
import { API_BASE } from '@/api/endpoints'

const title = ref('')
const content = ref('')

const coverImageFileName = ref('')
const coverImageUrl = ref('')
const coverImageId = ref('')
const loading = ref(false)
const progress = ref(0)
const error = ref('')

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadFile(target.files[0])
  }
}

// Drag & drop support (optional)
const handleDrop = (event: DragEvent) => {
  event.preventDefault()

  const file = event.dataTransfer?.files?.[0]
  if (!file) return

  uploadFile(file)
}

// Upload file immediately
const uploadFile = async (file: File) => {
  loading.value = true
  progress.value = 0
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('image', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE}/api/file/upload`, true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        progress.value = Math.round((e.loaded / e.total) * 100)
      }
    }

    xhr.onload = () => {
      loading.value = false
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText)
        coverImageUrl.value = res.url
        coverImageId.value = res.public_id
        coverImageFileName.value = file.name
      } else {
        error.value = 'Upload failed'
      }
    }

    xhr.onerror = () => {
      loading.value = false
      error.value = 'Upload failed'
    }

    xhr.send(formData)
  } catch {
    loading.value = false
    error.value = 'Upload failed'
  }
}

// Cleanup abandoned image
const cleanup = async () => {
  if (!coverImageId.value) return
  try {
    await fetch(`${API_BASE}/api/file/delete/${coverImageId.value}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.warn('Failed to delete abandoned image', err)
  }
}

onBeforeUnmount(cleanup)

// Submit form
const handleSubmit = async () => {
  if (!coverImageUrl.value) {
    error.value = 'Please upload a cover image.'
    return
  }

  const payload = {
    title: title.value,
    coverImage: {
      url: coverImageUrl.value,
      publicId: coverImageId.value,
      fileName: coverImageFileName.value,
    },
    description: content.value,
  }

  await axios.post(`${API_BASE}/api/post/createPost`, payload)

  // Reset form
  title.value = ''
  content.value = ''
  coverImageUrl.value = ''
  coverImageId.value = ''
  coverImageFileName.value = ''
  progress.value = 0
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="title-container">
      <label for="title">Title:</label>
      <input class="title" v-model="title" type="text" placeholder="Enter a title" />
    </div>

    <div class="title-container">
      <label for="cover-image">Cover Image:</label>

      <input
        type="file"
        accept="image/*"
        @change="handleFileUpload"
        ref="fileInput"
        class="hidden"
      />

      <div class="dropzone" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
        <p v-if="!coverImageUrl">Drag & drop an image or click to select</p>
        <img v-if="coverImageUrl" :src="coverImageUrl" alt="Uploaded cover" class="preview" />
      </div>

      <div v-if="loading" class="progress">Uploading: {{ progress }}%</div>
    </div>

    <div class="title-container">
      <label class="block font-medium mb-1">Description:</label>
      <TextEditorComponent v-model="content" />
    </div>

    <button type="submit" class="submit" :disabled="loading">
      {{ loading ? 'Uploading...' : 'Submit' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
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
  width: 50%;
}
.submit {
  width: min-content;
}
.error {
  color: red;
  font-size: 0.9rem;
}
.preview {
  margin-top: 1rem;
  max-width: 300px;
  border-radius: 4px;
}
.dropzone {
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
}
.progress {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}
.hidden {
  display: none;
}
@media (max-width: 640px) {
  .title {
    width: 100%;
  }
}
</style>
