<script setup lang="ts">
import { toasts } from "@/stores/toast";
</script>

<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 space-y-2">
    <div v-for="t in toasts" :key="t.id" class="rounded bg-black/80 text-white px-3 py-2 shadow">
      {{ t.text }}
    </div>
  </div>
</template>
