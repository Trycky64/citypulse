import { ref, watch } from "vue";
export function useDebounced(source, delay = 250) {
    const debounced = ref(source.value);
    let t;
    watch(source, (v) => {
        clearTimeout(t);
        t = setTimeout(() => (debounced.value = v), delay);
    });
    return debounced;
}
