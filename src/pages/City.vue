<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <main class="cp-container py-8">
    <h2 class="text-2xl font-semibold mb-4">Ville: {{ route.params.id }}</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="card">Météo</div>
      <div class="card">Qualité de l’air</div>
      <div class="card md:col-span-2">Carte</div>
    </div>
  </main>
</template>
