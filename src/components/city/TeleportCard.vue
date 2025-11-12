<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getTeleportInfo } from "@/services/teleport.service";
import TeleportRadial from "@/components/charts/TeleportRadial.vue";

const props = defineProps<{ cityName: string }>();
const loading = ref(true);
const error = ref<string|null>(null);
const info = ref<any>(null);

onMounted(async ()=>{
  try{ loading.value = true; info.value = await getTeleportInfo(props.cityName); }
  catch(e:any){ error.value = e?.message ?? "Erreur"; }
  finally{ loading.value = false; }
});

const topCats = computed(() => (info.value?.scores?.categories ?? []).slice(0,6));
const labels = computed(()=> topCats.value.map((c:any)=>c.name));
const scores = computed(()=> topCats.value.map((c:any)=>c.score));
</script>

<template>
  <div class="card">
    <div class="font-medium mb-2">Qualité de vie (Teleport)</div>
    <div v-if="loading" class="animate-pulse h-24"></div>
    <div v-else-if="error" class="text-red-600">Données indisponibles</div>
    <div v-else-if="!info?.scores">
      <div class="opacity-70">Données non disponibles pour cette ville.</div>
    </div>
    <div v-else class="grid gap-3 md:grid-cols-2">
      <div>
        <div class="text-lg font-semibold mb-1">Score global: {{ info.scores.cityScore }}/100</div>
        <ul class="text-sm space-y-1">
          <li v-for="c in topCats" :key="c.name" class="flex justify-between">
            <span class="opacity-80">{{ c.name }}</span><span>{{ c.score }}/10</span>
          </li>
        </ul>
      </div>
      <TeleportRadial :labels="labels" :scores="scores" />
    </div>
  </div>
</template>
