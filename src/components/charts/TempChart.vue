<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from "chart.js";
import { useChartColors } from '@/components/charts/useChartColors'
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ labels: string[]; min: number[]; max: number[]; unit?: "C"|"F" }>();
const { palette } = useChartColors()

const data = {
  labels: props.labels,
  datasets: [
    { label: `T° min (°${props.unit ?? "C"})`, data: props.min, borderColor: () => palette().accentA, backgroundColor: () => palette().accentFillA, tension: .3, pointRadius: 3 },
    { label: `T° max (°${props.unit ?? "C"})`, data: props.max, borderColor: () => palette().accentB, backgroundColor: () => palette().accentFillB, tension: .3, pointRadius: 3 },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { labels: { color: () => palette().text } },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      ticks: { color: () => palette().text },
      grid: { color: () => palette().grid },
    },
    y: {
      ticks: { color: () => palette().text },
      grid: { color: () => palette().grid },
      border: { color: () => palette().border }
    }
  }
};
</script>

<template>
  <div class="h-64"><Line :data="data" :options="options" /></div>
</template>
