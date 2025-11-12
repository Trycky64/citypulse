import { ref, watch, type Ref } from "vue";

export function useDebounced<T>(source: Ref<T>, delay = 250) {
  const debounced = ref(source.value) as Ref<T>;
  let t: any;
  watch(source, (v) => {
    clearTimeout(t);
    t = setTimeout(() => (debounced.value = v), delay);
  });
  return debounced;
}
