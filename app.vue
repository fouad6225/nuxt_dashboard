<template>
  <div class="app-layout">

    <div class="main-container">
      <!-- Only show Sidebar if mounted and auth.loggedIn -->

      <main class="page-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


// Import your Pinia auth store
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.page-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
