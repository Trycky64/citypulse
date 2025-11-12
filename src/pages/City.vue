<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { cityFromId } from "@/utils/city-id";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
import CityMap from "@/components/city/CityMap.vue";

const route = useRoute();
const city = computed(() => cityFromId(String(route.params.id)));
const loading = ref(true);
const error = ref<string | null>(null);
const weather = ref<any>(null);
const air = ref<any>(null);

onMounted(async () => {
  try {
    loading.value = true;
    const [w, a] = await Promise.all([
      getWeather(city.value.lat, city.value.lon),
      getAirQuality(city.value.lat, city.value.lon),
    ]);
    weather.value = w;
    air.value = a;
  } catch (e: any) {
    error.value = e?.message ?? "Erreur inconnue";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="cp-container py-8">
    <h2 class="text-2xl font-semibold mb-4">{{ city.name }}, {{ city.country }}</h2>

    <div v-if="error" class="card border border-red-400 text-red-600">Erreur : {{ error }}</div>

    <div v-else-if="loading" class="grid gap-4 md:grid-cols-2">
      <div class="card animate-pulse h-32"></div>
      <div class="card animate-pulse h-32"></div>
      <div class="card animate-pulse h-80 md:col-span-2"></div>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <div class="card">
        <div class="font-medium mb-2">Météo actuelle</div>
        <div class="text-3xl font-bold">{{ Math.round(weather.now.temp) }}°C</div>
        <div class="opacity-70">Ressenti {{ Math.round(weather.now.feels) }}°C</div>
        <div class="mt-3">
          <div class="text-sm font-medium mb-1">Prochains jours</div>
          <ul class="grid grid-cols-2 gap-2 text-sm">
            <li v-for="d in weather.daily.slice(0,5)" :key="d.date" class="flex justify-between">
              <span>{{ new Date(d.date).toLocaleDateString() }}</span>
              <span>{{ Math.round(d.tMin) }}° / {{ Math.round(d.tMax) }}°</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="font-medium mb-2">Qualité de l’air</div>
        <div class="text-2xl font-bold">AQI ~ {{ air.aqi }}</div>
        <div class="opacity-70">Catégorie : {{ air.category }}</div>
      </div>

      <div class="card md:col-span-2">
        <CityMap :lat="city.lat" :lon="city.lon" />
      </div>
    </div>
  </main>
</template>
