<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="sidebar">
    <RouterLink to="/new-post" class="circle-link">
      <div class="circle-wrapper">
        <svg class="circle-text" width="200" height="200" viewBox="0 0 200 200">
          <path
            id="circlePath"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <text text-anchor="middle">
            <textPath href="#circlePath" startOffset="50%">Click here to start a new post</textPath>
          </text>
        </svg>

        <button class="center-button" type="button">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
          >
            <line x1="6" y1="18" x2="18" y2="6" />
            <polyline points="9 6 18 6 18 15" />
          </svg>
        </button>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-link {
  display: inline-block;
  width: min-content;
  cursor: pointer;
}

.circle-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
}

/* Rotating text */
.circle-text {
  width: 200px;
  height: 200px;
  font-size: 18px;
  letter-spacing: 0.2em;
  animation: spin 10s linear infinite;
}

/* TRUE CENTERING */
.center-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #273fa3;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
