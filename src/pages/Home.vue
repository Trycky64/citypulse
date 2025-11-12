<script setup lang="ts">
import CitySearch from "@/features/search/CitySearch.vue";
import PreferencesPanel from "@/components/common/PreferencesPanel.vue";
import { usePrefs } from "@/stores/prefs";
import { useRouter } from "vue-router";
const prefs = usePrefs();
const router = useRouter();
function openDefault(){
  if (!prefs.defaultCity) return;
  const ref = prefs.defaultCity;
  // reuse city-id scheme if available
  router.push({ name: "city", params: { id: btoa(unescape(encodeURIComponent(JSON.stringify(ref))).replace(/=+$/,"")) } });
}
</script>

<template>
  <main class="cp-container py-8">
    <h1 class="text-3xl font-bold mb-6">CityPulse</h1>
    <div v-if="prefs.defaultCity" class="card mb-6 flex items-center justify-between">
      <div>
        <div class="font-medium">Ville par défaut</div>
        <div class="opacity-70 text-sm">{{ prefs.defaultCity.name }}, {{ prefs.defaultCity.country }}</div>
      </div>
      <button class="px-3 py-1 rounded bg-[var(--primary)] text-white transition duration-150 focus:ring" @click="openDefault">Ouvrir</button>
    </div>
    <p class="opacity-80 mb-6">Recherchez une ville pour voir météo, air et plus.</p>
    <div class="max-w-md">
      <CitySearch :navigateOnSelect="true" />
    </div>
    <PreferencesPanel class="mt-6 max-w-md" />
  </main>
</template>
