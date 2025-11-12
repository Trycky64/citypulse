<template>
  <router-view />
  <Toaster />
  
</template>

<script setup lang="ts">
import Toaster from "@/components/common/Toaster.vue";
</script>

<style scoped>
/* App shell is minimal; page-level layout/styles live in each view. */
</style>
