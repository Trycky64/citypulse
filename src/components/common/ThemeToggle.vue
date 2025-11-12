<script setup lang="ts">
const toggle = () => {
  const el = document.documentElement;
  el.classList.toggle("dark");
}
</script>

<template>
  <button class="px-3 py-1 rounded bg-primary text-white" @click="toggle">Toggle Theme</button>
</template>
