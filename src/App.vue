<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <div id="app-root" class="selection:bg-emerald-500 selection:text-white">
    <router-view />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

#app-root {
  min-height: 100vh;
}

body {
  @apply antialiased;
  margin: 0;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-zinc-100 dark:bg-zinc-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-zinc-300 dark:bg-zinc-700 rounded-full hover:bg-emerald-500 transition-all;
}
</style>
