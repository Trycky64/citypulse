<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CitySearch from "@/features/search/CitySearch.vue";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
import type { AirQuality } from "@/services/air.service";
import type { WeatherSummary } from "@/types/weather";

type CompareCity = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

type CitySearchResult = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

const route = useRoute();
const router = useRouter();

// ---------------------
// Helpers encodage URL
// ---------------------
function encodeCity(c: CompareCity | null): string | undefined {
  if (!c) return undefined;
  return encodeURIComponent(
    JSON.stringify({ n: c.name, c: c.country, la: c.lat, lo: c.lon }),
  );
}

function decodeCity(raw: unknown): CompareCity | null {
  if (typeof raw !== "string") return null;
  try {
    const obj = JSON.parse(decodeURIComponent(raw));
    if (
      typeof obj?.n === "string" &&
      typeof obj?.c === "string" &&
      typeof obj?.la === "number" &&
      typeof obj?.lo === "number"
    ) {
      return { name: obj.n, country: obj.c, lat: obj.la, lon: obj.lo };
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------
// State
// ---------------------
const leftCity = ref<CompareCity | null>(null);
const rightCity = ref<CompareCity | null>(null);

const loadingLeft = ref(false);
const loadingRight = ref(false);
const leftWeather = ref<WeatherSummary | null>(null);
const rightWeather = ref<WeatherSummary | null>(null);
const leftAir = ref<AirQuality | null>(null);
const rightAir = ref<AirQuality | null>(null);

// ---------------------
// Sync route <-> state
// ---------------------
function syncFromRoute() {
  const q = route.query;
  leftCity.value = decodeCity(q.left);
  rightCity.value = decodeCity(q.right);
  if (leftCity.value) loadLeftData();
  if (rightCity.value) loadRightData();
}

async function updateQuery() {
  await router.replace({
    name: "compare",
    query: { left: encodeCity(leftCity.value), right: encodeCity(rightCity.value) },
  });
}

onMounted(() => {
  syncFromRoute();
});

watch(
  () => route.query,
  () => {
    syncFromRoute();
  },
);

// ---------------------
// Chargement données
// ---------------------
async function loadLeftData() {
  if (!leftCity.value) return;
  loadingLeft.value = true;
  try {
    const { lat, lon } = leftCity.value;
    leftWeather.value = await getWeather(lat, lon);
    leftAir.value = await getAirQuality(lat, lon);
  } finally {
    loadingLeft.value = false;
  }
}

async function loadRightData() {
  if (!rightCity.value) return;
  loadingRight.value = true;
  try {
    const { lat, lon } = rightCity.value;
    rightWeather.value = await getWeather(lat, lon);
    rightAir.value = await getAirQuality(lat, lon);
  } finally {
    loadingRight.value = false;
  }
}

// ---------------------
// Handlers sélection
// ---------------------
function onSelectLeft(city: CitySearchResult) {
  leftCity.value = { name: city.name, country: city.country, lat: city.lat, lon: city.lon };
  updateQuery();
  loadLeftData();
}

function onSelectRight(city: CitySearchResult) {
  rightCity.value = { name: city.name, country: city.country, lat: city.lat, lon: city.lon };
  updateQuery();
  loadRightData();
}

// URL actuelle pour partage (F.03)
const shareUrl = computed(() => {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.pathname = "/compare";
  url.searchParams.set("left", encodeCity(leftCity.value) ?? "");
  url.searchParams.set("right", encodeCity(rightCity.value) ?? "");
  return url.toString();
});

// Copier lien
async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    alert("Lien de comparaison copié dans le presse-papier ✅");
  } catch {
    alert("Impossible de copier le lien.");
  }
}

// QR toggle
const showQr = ref(false);
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Comparer deux villes</h1>
        <p class="text-sm opacity-70">
          Choisissez deux villes pour comparer météo &amp; qualité de l’air. L’URL est partageable.
        </p>
      </div>

      <div v-if="leftCity && rightCity" class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-md text-xs bg-blue-600 hover:bg-blue-500 text-white"
          @click="copyLink"
        >
          Copier le lien
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-md text-xs bg-slate-800 hover:bg-slate-700"
          @click="showQr = !showQr"
        >
          {{ showQr ? "Masquer le QR" : "Afficher le QR" }}
        </button>
      </div>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card">
        <div class="mb-2 text-sm font-medium">Ville de gauche</div>
        <CitySearch :onPick="onSelectLeft" />
        <div v-if="leftCity" class="mt-3 text-sm opacity-80">
          {{ leftCity.name }} ({{ leftCity.country }})
        </div>
      </div>

      <div class="card">
        <div class="mb-2 text-sm font-medium">Ville de droite</div>
        <CitySearch :onPick="onSelectRight" />
        <div v-if="rightCity" class="mt-3 text-sm opacity-80">
          {{ rightCity.name }} ({{ rightCity.country }})
        </div>
      </div>
    </section>

    <!-- QR code simple en <img src="https://api.qrserver.com/..."> pour ne pas ajouter de lib -->
    <section v-if="showQr && leftCity && rightCity" class="flex justify-center">
      <div class="p-3 rounded-lg bg-black/20 border border-white/10 text-center">
        <div class="text-xs mb-2 opacity-80">Scanne ce QR pour ouvrir cette comparaison</div>
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
            shareUrl,
          )}`"
          alt="QR code CityPulse compare"
          class="mx-auto rounded bg-white"
        />
        <div class="mt-1 break-all max-w-xs mx-auto text-[10px] opacity-50">{{ shareUrl }}</div>
      </div>
    </section>

    <section v-if="leftCity && rightCity" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Col gauche -->
      <div class="card space-y-3">
        <div class="font-medium">{{ leftCity.name }} ({{ leftCity.country }})</div>

        <div v-if="loadingLeft" class="animate-pulse h-24 rounded bg-black/10" />

        <div v-else>
          <div v-if="leftWeather" class="text-sm">
            <div class="mb-1 font-semibold">Météo</div>
            <div class="text-xs opacity-80">
              {{ leftWeather.now.temp }}°C, {{ leftWeather.hourly.length ? leftWeather.hourly[0].temp : '' }}
            </div>
          </div>

          <div v-if="leftAir" class="mt-3 text-sm">
            <div class="mb-1 font-semibold">Qualité de l’air</div>
            <div class="text-xs opacity-80">AQI ≈ {{ leftAir.aqi }} — {{ leftAir.category }}</div>
          </div>
        </div>
      </div>

      <!-- Col droite -->
      <div class="card space-y-3">
        <div class="font-medium">{{ rightCity.name }} ({{ rightCity.country }})</div>

        <div v-if="loadingRight" class="animate-pulse h-24 rounded bg-black/10" />

        <div v-else>
          <div v-if="rightWeather" class="text-sm">
            <div class="mb-1 font-semibold">Météo</div>
            <div class="text-xs opacity-80">
              {{ rightWeather.now.temp }}°C, {{ rightWeather.hourly.length ? rightWeather.hourly[0].temp : '' }}
            </div>
          </div>

          <div v-if="rightAir" class="mt-3 text-sm">
            <div class="mb-1 font-semibold">Qualité de l’air</div>
            <div class="text-xs opacity-80">AQI ≈ {{ rightAir.aqi }} — {{ rightAir.category }}</div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="text-sm opacity-70">Choisis deux villes pour lancer la comparaison.</section>
  </div>
</template>
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
