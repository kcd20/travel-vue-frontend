<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue'
import TextEditorComponent from './TextEditorComponent.vue'
import axios from 'axios'
import { API_BASE } from '@/api/endpoints'

/* ======================
   State
====================== */
const title = ref('')
const editorContent = ref('')
const editorKey = ref(0)

const coverImageFileName = ref('')
const coverImageUrl = ref('')
const coverImageId = ref('')

const loading = ref(false)
const progress = ref(0)

const titleError = ref('')
const coverImageError = ref('')
const editorError = ref('')

const submitted = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)

/* ======================
   Reactive Validation
====================== */
watch(title, (val) => {
  if (!submitted.value) return
  titleError.value = val.trim() ? '' : 'Please enter a title.'
})

watch(editorContent, (val) => {
  if (!submitted.value) return
  editorError.value = val.trim() ? '' : 'Please enter a description.'
})

watch(coverImageUrl, (val) => {
  if (!submitted.value) return
  coverImageError.value = val ? '' : 'Please upload a cover image.'
})

/* ======================
   File Handling
====================== */
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadFile(target.files[0])
  }
}

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
  coverImageError.value = ''

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
        coverImageError.value = 'Upload failed'
      }
    }

    xhr.onerror = () => {
      loading.value = false
      coverImageError.value = 'Upload failed'
    }

    xhr.send(formData)
  } catch {
    loading.value = false
    coverImageError.value = 'Upload failed'
  }
}

/* ======================
   Cleanup
====================== */
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

/* ======================
   Submit
====================== */
const handleSubmit = async () => {
  submitted.value = true
  titleError.value = title.value.trim() ? '' : 'Please enter a title.'
  coverImageError.value = coverImageUrl.value ? '' : 'Please upload a cover image.'
  editorError.value = editorContent.value.trim() ? '' : 'Please enter a description.'

  if (titleError.value || coverImageError.value || editorError.value) return

  const payload = {
    title: title.value,
    coverImage: {
      url: coverImageUrl.value,
      publicId: coverImageId.value,
      fileName: coverImageFileName.value,
    },
    description: editorContent.value,
  }

  await axios.post(`${API_BASE}/api/post/createPost`, payload)

  // Reset form
  submitted.value = false
  title.value = ''
  coverImageUrl.value = ''
  coverImageId.value = ''
  coverImageFileName.value = ''
  progress.value = 0
  editorKey.value++
  editorContent.value = ''
}
</script>

<template>
  <div class="page-wrapper">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="title-container">
        <label for="title">Title:</label>
        <input class="title" v-model="title" type="text" placeholder="Enter a title" />
        <p class="error">{{ titleError }}</p>
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

        <div
          class="dropzone"
          @click="triggerFileInput"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <p v-if="!coverImageUrl">Drag & drop an image or click to select</p>
          <img v-if="coverImageUrl" :src="coverImageUrl" alt="Uploaded cover" class="preview" />
        </div>

        <div v-if="loading" class="progress">Uploading...</div>
        <p class="error">{{ coverImageError }}</p>
      </div>

      <div class="title-container">
        <label class="block font-medium mb-1">Description:</label>
        <TextEditorComponent v-model="editorContent" :key="editorKey" />
        <p class="error">{{ editorError }}</p>
      </div>

      <button type="submit" class="action-button" :disabled="loading">
        {{ loading ? 'Uploading...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
}
.title-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.title {
  height: 1.5rem;
}

.error {
  color: red;
  height: 18px;
}
.preview {
  max-width: 400px;
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
  .form {
    width: 100%;
  }
}
</style>
