<script setup lang="ts">
import CitySearch from "@/features/search/CitySearch.vue";
import PreferencesPanel from "@/components/common/PreferencesPanel.vue";
</script>

<template>
  <main class="cp-container py-8">
    <h1 class="text-3xl font-bold mb-6">CityPulse</h1>
    <p class="opacity-80 mb-6">Recherchez une ville pour voir météo, air et plus.</p>
    <div class="max-w-md">
      <CitySearch :navigate-on-select="true" />
    </div>
    <PreferencesPanel class="mt-6 max-w-md" />
  </main>
</template>
