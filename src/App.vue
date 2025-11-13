<template>
  <OfflineBanner />
  <Navbar />
  <router-view />
  <Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/common/Toaster.vue";
import OfflineBanner from "@/components/common/OfflineBanner.vue";
import Navbar from "@/components/common/Navbar.vue";
</script>

<style scoped>
/* App shell is minimal; page-level layout/styles live in each view. */
</style>
