<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ labels: string[]; pm25: (number|null|undefined)[]; pm10: (number|null|undefined)[] }>();
const seriesPM25 = props.pm25.map(v => v ?? null);
const seriesPM10 = props.pm10.map(v => v ?? null);
const data = {
  labels: props.labels,
  datasets: [
    { label: "PM2.5 (µg/m³)", data: seriesPM25 },
    { label: "PM10 (µg/m³)", data: seriesPM10 },
  ],
};
const options = { responsive: true, maintainAspectRatio: false };
</script>

<template>
  <div class="h-64"><Line :data="data" :options="options" /></div>
</template>
