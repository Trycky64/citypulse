<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from "chart.js";
import { useChartColors } from '@/components/charts/useChartColors'
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ labels: string[]; pm25: (number|null|undefined)[]; pm10: (number|null|undefined)[] }>();
const seriesPM25 = props.pm25.map(v => v ?? null);
const seriesPM10 = props.pm10.map(v => v ?? null);
const { palette } = useChartColors()
const data = {
  labels: props.labels,
  datasets: [
    { label: "PM2.5 (µg/m³)", data: seriesPM25, borderColor: () => palette().accentA, backgroundColor: () => palette().accentFillA, spanGaps: true, tension: .25, pointRadius: 2 },
    { label: "PM10 (µg/m³)", data: seriesPM10, borderColor: () => palette().accentB, backgroundColor: () => palette().accentFillB, spanGaps: true, tension: .25, pointRadius: 2 },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'nearest', intersect: false },
  plugins: {
    legend: { labels: { color: () => palette().text } },
    tooltip: { enabled: true },
  },
  scales: {
    x: { ticks: { color: () => palette().text }, grid: { color: () => palette().grid } },
    y: { ticks: { color: () => palette().text }, grid: { color: () => palette().grid }, border: { color: () => palette().border } }
  }
};
</script>

<template>
  <div class="h-64"><Line :data="data" :options="options" /></div>
</template>
