<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { searchCities } from "@/services/geo.service";
import { cityIdFrom } from "@/utils/city-id";
import type { City } from "@/types/city";
import { useRouter } from "vue-router";

const props = defineProps<{ placeholder?: string; navigateOnSelect?: boolean; onPick?: (c: City) => void }>();
const router = useRouter();

const q = ref("");
const listId = "citysearch-list";
const highlightedId = computed(()=> highlighted.value>=0 ? `opt-${highlighted.value}` : undefined);
const results = ref<City[]>([]);
const open = ref(false);
const highlighted = ref(-1);
let abort = false;

async function runSearch() {
  abort = true; // annule un tour précédent (simple guard)
  const localFlag = Symbol();
  (runSearch as any)._flag = localFlag;
  abort = false;
  const data = await searchCities(q.value);
  if ((runSearch as any)._flag !== localFlag || abort) return;
  results.value = data;
  open.value = data.length > 0;
}

let t: number | undefined;
function onInput() {
  window.clearTimeout(t);
  t = window.setTimeout(runSearch, 250);
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value && ["ArrowDown","ArrowUp"].includes(e.key)) {
    open.value = true;
  }
  if (e.key === "ArrowDown") {
    if (results.value.length > 0) {
      highlighted.value = (highlighted.value + 1) % results.value.length;
      e.preventDefault();
    }
  } else if (e.key === "ArrowUp") {
    if (results.value.length > 0) {
      highlighted.value = (highlighted.value - 1 + results.value.length) % results.value.length;
      e.preventDefault();
    }
  } else if (e.key === "Enter" && highlighted.value >= 0) {
    e.preventDefault();
    const sel = results.value[highlighted.value];
    if (sel) pick(sel);
  } else if (e.key === "Escape") {
    open.value = false;
  }
}

function pick(c: City) {
  open.value = false;
  q.value = `${c.name}, ${c.country}`;
  if (props.onPick) props.onPick(c);
  if (props.navigateOnSelect) {
    const id = cityIdFrom(c.lat, c.lon, c.name, c.country);
    router.push({ name: "city", params: { id } });
  }
}

function clickOutside(e: MouseEvent) {
  const el = e.target as HTMLElement;
  if (!el.closest?.(".cp-citysearch")) open.value = false;
}
onMounted(() => document.addEventListener("click", clickOutside));
onBeforeUnmount(() => document.removeEventListener("click", clickOutside));

const has = computed(() => results.value.length > 0);
</script>

<template>
  <div class="cp-citysearch relative">
    <input
      v-model="q"
      :placeholder="placeholder ?? 'Rechercher une ville...'"
      class="w-full rounded border px-3 py-2 outline-none focus:ring"
      role="combobox"
      :aria-expanded="open"
      aria-autocomplete="list"
      :aria-controls="listId"
      :aria-activedescendant="highlightedId"
      @input="onInput"
      @keydown="onKeydown"
    />
    <ul
      v-if="open && has"
      :id="listId"
      class="absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded border bg-[var(--bg)] shadow"
      role="listbox"
    >
      <li
        v-for="(c, i) in results"
        :id="`opt-${i}`"
        :key="c.id"
        :class="['px-3 py-2 cursor-pointer hover:bg-black/5', i===highlighted && 'bg-black/10']"
        role="option"
        :aria-selected="i===highlighted"
        @mouseenter="highlighted = i"
        @mousedown.prevent="pick(c)"
      >
        <span class="font-medium">{{ c.name }} ({{ c.country }})</span>
      </li>
    </ul>
  </div>
</template>
