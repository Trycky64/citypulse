<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from "vue";
import * as L from "leaflet";

const props = defineProps<{
  lat: number;
  lon: number;
}>();

const mapEl = ref<HTMLDivElement | null>(null);
let map: L.Map | null = null;
let marker: L.Marker | null = null;

onMounted(() => {
  if (!mapEl.value) return;

  map = L.map(mapEl.value, {
    center: [props.lat, props.lon],
    zoom: 11,
    zoomControl: true,
  });

  const tileUrl =
    import.meta.env.VITE_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  L.tileLayer(tileUrl, {
    attribution: "© OpenStreetMap",
    maxZoom: 19,
  }).addTo(map);

  marker = L.marker([props.lat, props.lon]).addTo(map);

  // Fix classique : forcer le recalcul après montage
  setTimeout(() => {
    map?.invalidateSize();
  }, 0);
});

// Quand on change de ville
watch(
  () => [props.lat, props.lon],
  ([lat, lon]) => {
    if (!map) return;

    const newCenter: L.LatLngExpression = [lat, lon];
    map.setView(newCenter, map.getZoom());
    if (marker) {
      marker.setLatLng(newCenter);
    }
  },
);

onBeforeUnmount(() => {
  map?.remove();
  map = null;
  marker = null;
});
</script>

<template>
  <div class="w-full">
    <div class="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-white/5">
      <div ref="mapEl" class="w-full h-full" />
    </div>
  </div>
</template>
