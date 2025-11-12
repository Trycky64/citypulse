<script setup lang="ts">
import { ref } from "vue";
import CitySearch from "@/features/search/CitySearch.vue";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
import type { City } from "@/types/city";

const aCity = ref<City | null>(null);
const bCity = ref<City | null>(null);
const aData = ref<{ weather: any; air: any } | null>(null);
const bData = ref<{ weather: any; air: any } | null>(null);
const loading = ref(false);

async function load() {
  if (!aCity.value || !bCity.value) return;
  loading.value = true;
  const [aw, aa, bw, ba] = await Promise.all([
    getWeather(aCity.value.lat, aCity.value.lon),
    getAirQuality(aCity.value.lat, aCity.value.lon),
    getWeather(bCity.value.lat, bCity.value.lon),
    getAirQuality(bCity.value.lat, bCity.value.lon),
  ]);
  aData.value = { weather: aw, air: aa };
  bData.value = { weather: bw, air: ba };
  loading.value = false;
}
</script>

<template>
  <main class="cp-container py-8">
    <h2 class="text-2xl font-semibold mb-6">Comparer deux villes</h2>

    <div class="grid gap-4 md:grid-cols-2 mb-6">
      <div class="card">
        <div class="font-medium mb-2">Ville A</div>
        <CitySearch :onPick="(c)=>{ aCity=c }" />
      </div>
      <div class="card">
        <div class="font-medium mb-2">Ville B</div>
        <CitySearch :onPick="(c)=>{ bCity=c }" />
      </div>
    </div>

    <button class="px-4 py-2 rounded bg-[var(--primary)] text-white disabled:opacity-50"
            :disabled="!aCity || !bCity"
            @click="load">
      Charger la comparaison
    </button>

    <div v-if="loading" class="grid gap-4 md:grid-cols-2 mt-6">
      <div class="card animate-pulse h-40"></div>
      <div class="card animate-pulse h-40"></div>
    </div>

    <div v-else-if="aData && bData" class="grid gap-4 md:grid-cols-2 mt-6">
      <div class="card">
        <div class="font-medium mb-2">{{ aCity!.name }}, {{ aCity!.country }}</div>
        <div class="text-2xl font-bold">{{ Math.round(aData.weather.now.temp) }}°C</div>
        <div class="opacity-70">AQI ~ {{ aData.air.aqi }} ({{ aData.air.category }})</div>
      </div>
      <div class="card">
        <div class="font-medium mb-2">{{ bCity!.name }}, {{ bCity!.country }}</div>
        <div class="text-2xl font-bold">{{ Math.round(bData.weather.now.temp) }}°C</div>
        <div class="opacity-70">AQI ~ {{ bData.air.aqi }} ({{ bData.air.category }})</div>
      </div>
    </div>
  </main>
</template>
