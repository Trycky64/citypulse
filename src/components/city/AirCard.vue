<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { AirQuality } from "@/services/air.service";
import { getAirQuality } from "@/services/air.service";

const props = defineProps<{
  lat: number;
  lon: number;
}>();

const loading = ref(true);
const error = ref<string | null>(null);
const air = ref<AirQuality | null>(null);

async function load() {
  try {
    loading.value = true;
    error.value = null;
    air.value = await getAirQuality(props.lat, props.lon);

    if (!air.value || air.value.samples.length === 0) {
      error.value = "Données de qualité de l’air indisponibles pour cette zone.";
    }
  } catch (e) {
    console.error(e);
    error.value = "Impossible de récupérer la qualité de l’air.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => [props.lat, props.lon], load);
</script>

<template>
  <div class="card">
    <div class="font-medium mb-2">Qualité de l’air</div>

    <div v-if="loading" class="animate-pulse h-20 rounded bg-black/10"></div>

    <div v-else-if="error" class="text-sm text-amber-500">
      {{ error }}
    </div>

    <div v-else-if="air" class="space-y-2">
      <div class="text-lg font-semibold">
        AQI approx. : {{ air.aqi }}
      </div>
      <div class="text-sm opacity-80">
        {{ air.category }}
      </div>

      <!-- Ici tu branches ton graphe sur air.samples si tu veux -->
      <!-- Exemple: dernière ligne connue -->
      <div v-if="air.samples.length" class="text-xs opacity-70">
        Dernière mesure connue : {{ air.samples[air.samples.length - 1].time }}
      </div>
    </div>
  </div>
</template>
