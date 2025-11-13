<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const offline = ref(!navigator.onLine)

function set() { offline.value = !navigator.onLine }

onMounted(() => {
  window.addEventListener('online', set)
  window.addEventListener('offline', set)
})
onBeforeUnmount(() => {
  window.removeEventListener('online', set)
  window.removeEventListener('offline', set)
})
</script>

<template>
  <div v-if="offline" class="fixed top-0 left-0 right-0 z-50 bg-black text-white text-center py-2 text-sm">
    Mode hors ligne — certaines données récentes peuvent être indisponibles.
  </div>
</template>

<style scoped>
/* keep minimal; theme colors are handled globally */
</style>
