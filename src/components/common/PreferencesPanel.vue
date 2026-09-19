<script setup lang="ts">
import { usePrefs } from "@/stores/prefs";
const prefs = usePrefs();
</script>

<template>
  <div class="card space-y-3">
    <div class="font-medium">Préférences</div>
    <div class="flex items-center gap-3">
      <span>Température</span>
      <button
type="button"
        class="px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900"
        :aria-pressed="prefs.tempUnit==='C'"
        :class="prefs.tempUnit==='C' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800'"
        @click="prefs.setTempUnit('C')">°C</button>
      <button
type="button"
        class="px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900"
        :aria-pressed="prefs.tempUnit==='F'"
        :class="prefs.tempUnit==='F' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800'"
        @click="prefs.setTempUnit('F')">°F</button>
    </div>
  </div>
</template>
