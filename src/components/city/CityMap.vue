<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";

const props = defineProps<{ lat: number; lon: number; zoom?: number }>();
let map: L.Map;

onMounted(() => {
  map = L.map("map", { center: [props.lat, props.lon], zoom: props.zoom ?? 11 });
  L.tileLayer(import.meta.env.VITE_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([props.lat, props.lon]).addTo(map);
});
onBeforeUnmount(() => map?.remove());
</script>

<template>
  <div id="map" class="h-80 w-full rounded overflow-hidden"></div>
</template>
