<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { cityFromId } from "@/utils/city-id";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
import CityMap from "@/components/city/CityMap.vue";
import TempChart from "@/components/charts/TempChart.vue";
import AirChart from "@/components/charts/AirChart.vue";
import TeleportCard from "@/components/city/TeleportCard.vue";
import { usePrefs } from "@/stores/prefs";
const prefs = usePrefs();
function toUnitCtoF(v:number){ return v*9/5+32; }
const unit = () => prefs.tempUnit; // "C" | "F"
function maybeConvert(v:number){ return unit()==="F" ? toUnitCtoF(v) : v; }

const route = useRoute();
const city = computed(() => cityFromId(String(route.params.id)));
const loading = ref(true);
const error = ref<string | null>(null);
const weather = ref<any>(null);
const air = ref<any>(null);

function pinCity(){
  prefs.toggleFavorite({ id: String(route.params.id), name: city.value.name, country: city.value.country, lat: city.value.lat, lon: city.value.lon });
}
function isFav(){
  return prefs.favorites.some(f=>f.name===city.value.name && f.country===city.value.country && f.lat===city.value.lat && f.lon===city.value.lon);
}

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
    <h2 class="text-2xl font-semibold mb-2">{{ city.name }}, {{ city.country }}</h2>
    <p class="opacity-70 mb-4 text-sm">
      Pays : {{ city.country }} • Lat/Lon : {{ city.lat.toFixed(4) }}, {{ city.lon.toFixed(4) }}
    </p>
    <button aria-label="Ajouter ou retirer des favoris" class="px-3 py-1 rounded bg-[var(--primary)] text-white mb-4 focus:ring" @click="pinCity">
      {{ isFav() ? "Retirer des favoris" : "Ajouter aux favoris" }}
    </button>

    <div v-if="error" class="card border border-red-400 text-red-600">Erreur : {{ error }}</div>

    <div v-else-if="loading" class="grid gap-4 md:grid-cols-2">
      <div class="card animate-pulse h-32"></div>
      <div class="card animate-pulse h-32"></div>
      <div class="card animate-pulse h-80 md:col-span-2"></div>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <div class="card">
        <div class="font-medium mb-2">Météo actuelle</div>
        <div class="text-3xl font-bold">{{ Math.round(maybeConvert(weather.now.temp)) }}°{{ unit() }}</div>
        <div class="opacity-70">Ressenti {{ Math.round(maybeConvert(weather.now.feels)) }}°{{ unit() }}</div>
        <div class="mt-3">
          <div class="text-sm font-medium mb-1">Prochains jours</div>
          <ul class="grid grid-cols-2 gap-2 text-sm">
            <li v-for="d in weather.daily.slice(0,5)" :key="d.date" class="flex justify-between">
              <span>{{ new Date(d.date).toLocaleDateString() }}</span>
              <span>{{ Math.round(maybeConvert(d.tMin)) }}° / {{ Math.round(maybeConvert(d.tMax)) }}°</span>
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

      <div class="card md:col-span-2">
        <div class="font-medium mb-2">Températures (7j)</div>
        <TempChart
          :labels="weather.daily.map((d: any)=>new Date(d.date).toLocaleDateString())"
          :min="weather.daily.map((d: any)=>Math.round(maybeConvert(d.tMin)))"
          :max="weather.daily.map((d: any)=>Math.round(maybeConvert(d.tMax)))"
          :unit="unit()"
        />
      </div>

      <div class="card md:col-span-2">
        <div class="font-medium mb-2">Pollution (dernières heures)</div>
        <AirChart
          :labels="air.samples.map((s: any)=>new Date(s.time).toLocaleTimeString())"
          :pm25="air.samples.map((s: any)=>s.pm25 ?? null)"
          :pm10="air.samples.map((s: any)=>s.pm10 ?? null)"
        />
      </div>

      <TeleportCard class="md:col-span-2" :cityName="city.name" />
    </div>
  </main>
</template>

<script lang="ts">
// pin favorites helpers separated from setup for clarity
</script>
