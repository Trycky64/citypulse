<script setup lang="ts">
import { usePrefs } from "@/stores/prefs";
const prefs = usePrefs();
</script>

<template>
  <div class="card space-y-3">
    <div class="font-medium">Préférences</div>
    <div class="flex items-center gap-3">
      <span>Température</span>
      <button class="px-2 py-1 rounded border" :class="prefs.tempUnit==='C' && 'bg-black/10'" @click="prefs.setTempUnit('C')">°C</button>
      <button class="px-2 py-1 rounded border" :class="prefs.tempUnit==='F' && 'bg-black/10'" @click="prefs.setTempUnit('F')">°F</button>
    </div>
    <div class="flex items-center gap-3">
      <span>Langue</span>
      <button class="px-2 py-1 rounded border" :class="prefs.language==='fr' && 'bg-black/10'" @click="prefs.setLanguage('fr')">FR</button>
      <button class="px-2 py-1 rounded border" :class="prefs.language==='en' && 'bg-black/10'" @click="prefs.setLanguage('en')">EN</button>
    </div>
    <div class="text-sm opacity-70">Ville par défaut : depuis une page Ville, ajoute-la aux favoris et définis-la comme défaut (à implémenter si besoin).</div>
  </div>
</template>
