<script setup lang="ts">
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from "chart.js";
import { useChartColors } from '@/components/charts/useChartColors'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const props = defineProps<{ labels: string[]; scores: number[] }>();
const { palette } = useChartColors()
const data = {
  labels: props.labels,
  datasets: [
    {
      label: "Scores",
      data: props.scores,
      fill: true,
      backgroundColor: () => palette().accentFillA,
      borderColor: () => palette().accentA,
      pointBackgroundColor: () => palette().accentA,
      pointBorderColor: () => palette().text,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 10,
      ticks: { stepSize: 2, color: () => palette().text },
      grid: { color: () => palette().grid },
      angleLines: { color: () => palette().grid },
      pointLabels: { color: () => palette().text }
    },
  },
  plugins: {
    legend: { labels: { color: () => palette().text } },
    tooltip: { enabled: true }
  }
};
</script>

<template>
  <div class="h-56"><Radar :data="data" :options="options" /></div>
</template>
