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
    JSON.stringify({
      n: c.name,
      c: c.country,
      la: c.lat,
      lo: c.lon,
    }),
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
      return {
        name: obj.n,
        country: obj.c,
        lat: obj.la,
        lon: obj.lo,
      };
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

const leftError = ref<string | null>(null);
const rightError = ref<string | null>(null);

// ---------------------
// Sync route <-> state
// ---------------------
function syncFromRoute() {
  const q = route.query;
  leftCity.value = decodeCity(q.left);
  rightCity.value = decodeCity(q.right);
  if (leftCity.value) void loadLeftData();
  if (rightCity.value) void loadRightData();
}

async function updateQuery() {
  await router.replace({
    name: "compare",
    query: {
      left: encodeCity(leftCity.value),
      right: encodeCity(rightCity.value),
    },
  }).catch((err) => {
    console.error("[CityPulse] router.replace /compare failed", err);
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
  leftError.value = null;
  try {
    const { lat, lon } = leftCity.value;
    leftWeather.value = await getWeatherSummary(lat, lon);
    leftAir.value = await getAirQuality(lat, lon);
  } catch (e) {
    console.error("[CityPulse] loadLeftData error", e);
    leftError.value = "Données indisponibles pour cette ville.";
  } finally {
    loadingLeft.value = false;
  }
}

async function loadRightData() {
  if (!rightCity.value) return;
  loadingRight.value = true;
  rightError.value = null;
  try {
    const { lat, lon } = rightCity.value;
    rightWeather.value = await getWeatherSummary(lat, lon);
    rightAir.value = await getAirQuality(lat, lon);
  } catch (e) {
    console.error("[CityPulse] loadRightData error", e);
    rightError.value = "Données indisponibles pour cette ville.";
  } finally {
    loadingRight.value = false;
  }
}

// ---------------------
// Handlers sélection
// ---------------------
function onSelectLeft(city: CitySearchResult) {
  leftCity.value = {
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  };
  void updateQuery();
  void loadLeftData();
}

function onSelectRight(city: CitySearchResult) {
  rightCity.value = {
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  };
  void updateQuery();
  void loadRightData();
}

// URL actuelle pour partage
const shareUrl = computed(() => {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
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

    <!-- Sélecteurs -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card">
        <div class="mb-2 text-sm font-medium">Ville de gauche</div>
          <CitySearch :onPick="onSelectLeft" />
        <div v-if="leftCity" class="mt-3 text-xs opacity-80">
          {{ leftCity.name }} ({{ leftCity.country }}) ·
          lat {{ leftCity.lat.toFixed(3) }}, lon {{ leftCity.lon.toFixed(3) }}
        </div>
      </div>

      <div class="card">
        <div class="mb-2 text-sm font-medium">Ville de droite</div>
          <CitySearch :onPick="onSelectRight" />
        <div v-if="rightCity" class="mt-3 text-xs opacity-80">
          {{ rightCity.name }} ({{ rightCity.country }}) ·
          lat {{ rightCity.lat.toFixed(3) }}, lon {{ rightCity.lon.toFixed(3) }}
        </div>
      </div>
    </section>

    <!-- QR code -->
    <section v-if="showQr && leftCity && rightCity" class="flex justify-center">
      <div class="p-3 rounded-lg bg-black/20 border border-white/10 text-center">
        <div class="text-xs mb-2 opacity-80">
          Scanne ce QR pour ouvrir cette comparaison
        </div>
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
            shareUrl,
          )}`"
          alt="QR code CityPulse compare"
          class="mx-auto rounded bg-white"
        />
        <div class="mt-1 break-all max-w-xs mx-auto text-[10px] opacity-50">
          {{ shareUrl }}
        </div>
      </div>
    </section>

    <!-- Comparaison -->
  <section v-if="leftCity && rightCity" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Col gauche -->
      <div class="card space-y-3">
        <div class="font-medium">
          {{ leftCity.name }} ({{ leftCity.country }})
        </div>

        <div class="text-[11px] opacity-60">
          lat {{ leftCity.lat.toFixed(3) }} · lon {{ leftCity.lon.toFixed(3) }}
        </div>

        <div v-if="loadingLeft" class="animate-pulse h-24 rounded bg-black/10" />

        <div v-else>
          <div v-if="leftError" class="text-xs text-amber-500">
            {{ leftError }}
          </div>

          <div v-else>
            <div v-if="leftWeather" class="text-sm mb-2">
              <div class="mb-1 font-semibold">Météo</div>
              <div class="text-xs opacity-80">
                {{ leftWeather.now.temp }}°C, ressenti {{ leftWeather.now.feels }}°
              </div>
              <div class="text-[11px] opacity-60">
                Min {{ leftWeather.daily.min }}°C · Max {{ leftWeather.daily.max }}°C
              </div>
            </div>

            <div v-if="leftAir" class="mt-3 text-sm">
              <div class="mb-1 font-semibold">Qualité de l’air</div>
              <div class="text-xs opacity-80">
                AQI ≈ {{ leftAir.aqi }} — {{ leftAir.category }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Col droite -->
      <div class="card space-y-3">
        <div class="font-medium">
          {{ rightCity.name }} ({{ rightCity.country }})
        </div>

        <div class="text-[11px] opacity-60">
          lat {{ rightCity.lat.toFixed(3) }} · lon {{ rightCity.lon.toFixed(3) }}
        </div>

        <div v-if="loadingRight" class="animate-pulse h-24 rounded bg-black/10" />

        <div v-else>
          <div v-if="rightError" class="text-xs text-amber-500">
            {{ rightError }}
          </div>

          <div v-else>
            <div v-if="rightWeather" class="text-sm mb-2">
              <div class="mb-1 font-semibold">Météo</div>
              <div class="text-xs opacity-80">
                {{ rightWeather.now.temp }}°C, ressenti {{ rightWeather.now.feels }}°
              </div>
              <div class="text-[11px] opacity-60">
                Min {{ rightWeather.daily.min }}°C · Max {{ rightWeather.daily.max }}°C
              </div>
            </div>

            <div v-if="rightAir" class="mt-3 text-sm">
              <div class="mb-1 font-semibold">Qualité de l’air</div>
              <div class="text-xs opacity-80">
                AQI ≈ {{ rightAir.aqi }} — {{ rightAir.category }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="text-sm opacity-70">
      Choisis deux villes pour lancer la comparaison.
    </section>
  </div>
</template>
