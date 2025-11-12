<script setup lang="ts">
import { usePrefs } from "@/stores/prefs";
import { useRouter } from "vue-router";
import { cityIdFrom } from "@/utils/city-id";
const prefs = usePrefs();
const router = useRouter();

function openFav(f:any){
  const id = cityIdFrom(f.lat, f.lon, f.name, f.country);
  router.push({ name: "city", params: { id } });
}
</script>

<template>
  <main class="cp-container py-8">
    <h2 class="text-2xl font-semibold mb-4">Favoris</h2>
    <div v-if="!prefs.favorites.length" class="card">Aucun favori.</div>
    <ul v-else class="grid md:grid-cols-2 gap-3">
      <li v-for="f in prefs.favorites" :key="f.name+f.lat" class="card cursor-pointer" @click="openFav(f)">
        <div class="font-medium">{{ f.name }}, {{ f.country }}</div>
        <div class="opacity-70 text-sm">Lat/Lon: {{ f.lat.toFixed(4) }}, {{ f.lon.toFixed(4) }}</div>
      </li>
    </ul>
  </main>
  
</template>
