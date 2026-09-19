<template>
  <header class="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between">
        <!-- Brand -->
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="@/assets/logo.svg" alt="CityPulse" class="h-6 w-auto" />
        </RouterLink>
        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-4 text-sm">
          <RouterLink class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" to="/">Home</RouterLink>
          <RouterLink class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" to="/compare">Compare</RouterLink>
          <RouterLink class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" to="/favorites">Favorites</RouterLink>
          <ThemeToggle />
        </nav>
        <!-- Mobile toggler -->
        <button class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle navigation" @click="open = !open">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <!-- Mobile nav -->
    <div v-if="open" class="md:hidden border-t border-gray-200 dark:border-gray-800">
      <div class="px-4 py-3 flex items-center gap-3">
        <RouterLink class="block text-gray-700 dark:text-gray-200" to="/" @click="open=false">Home</RouterLink>
        <RouterLink class="block text-gray-700 dark:text-gray-200" to="/compare" @click="open=false">Compare</RouterLink>
        <RouterLink class="block text-gray-700 dark:text-gray-200" to="/favorites" @click="open=false">Favorites</RouterLink>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const open = ref(false)
</script>

<style scoped>
/* Navbar specific fine-tunes can go here if needed */
</style>
