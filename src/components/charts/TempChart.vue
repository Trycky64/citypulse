<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ labels: string[]; min: number[]; max: number[]; unit?: "C"|"F" }>();
const data = {
  labels: props.labels,
  datasets: [
    { label: `T° min (°${props.unit ?? "C"})`, data: props.min },
    { label: `T° max (°${props.unit ?? "C"})`, data: props.max },
  ],
};
const options = { responsive: true, maintainAspectRatio: false };
</script>

<template>
  <div class="h-64"><Line :data="data" :options="options" /></div>
</template>
