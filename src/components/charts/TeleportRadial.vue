<script setup lang="ts">
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from "chart.js";
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const props = defineProps<{ labels: string[]; scores: number[] }>();
const data = {
  labels: props.labels,
  datasets: [
    {
      label: "Scores",
      data: props.scores,
      fill: true,
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      borderColor: "rgba(37, 99, 235, 1)",
      pointBackgroundColor: "rgba(37, 99, 235, 1)",
      pointBorderColor: "#fff",
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
      ticks: { stepSize: 2 },
    },
  },
};
</script>

<template>
  <div class="h-56"><Radar :data="data" :options="options" /></div>
</template>
