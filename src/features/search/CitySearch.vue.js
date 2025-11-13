import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { searchCities } from "@/services/geo.service";
import { cityIdFrom } from "@/utils/city-id";
import { useRouter } from "vue-router";
const props = defineProps();
const router = useRouter();
const q = ref("");
const listId = "citysearch-list";
const highlightedId = computed(() => highlighted.value >= 0 ? `opt-${highlighted.value}` : undefined);
const results = ref([]);
const open = ref(false);
const highlighted = ref(-1);
let abort = false;
async function runSearch() {
    abort = true; // annule un tour précédent (simple guard)
    const localFlag = Symbol();
    runSearch._flag = localFlag;
    abort = false;
    const data = await searchCities(q.value);
    if (runSearch._flag !== localFlag || abort)
        return;
    results.value = data;
    open.value = data.length > 0;
}
let t;
function onInput() {
    window.clearTimeout(t);
    t = window.setTimeout(runSearch, 250);
}
function onKeydown(e) {
    if (!open.value && ["ArrowDown", "ArrowUp"].includes(e.key)) {
        open.value = true;
    }
    if (e.key === "ArrowDown") {
        if (results.value.length > 0) {
            highlighted.value = (highlighted.value + 1) % results.value.length;
            e.preventDefault();
        }
    }
    else if (e.key === "ArrowUp") {
        if (results.value.length > 0) {
            highlighted.value = (highlighted.value - 1 + results.value.length) % results.value.length;
            e.preventDefault();
        }
    }
    else if (e.key === "Enter" && highlighted.value >= 0) {
        e.preventDefault();
        const sel = results.value[highlighted.value];
        if (sel)
            pick(sel);
    }
    else if (e.key === "Escape") {
        open.value = false;
    }
}
function pick(c) {
    open.value = false;
    q.value = `${c.name}, ${c.country}`;
    if (props.onPick)
        props.onPick(c);
    if (props.navigateOnSelect) {
        const id = cityIdFrom(c.lat, c.lon, c.name, c.country);
        router.push({ name: "city", params: { id } });
    }
}
function clickOutside(e) {
    const el = e.target;
    if (!el.closest?.(".cp-citysearch"))
        open.value = false;
}
onMounted(() => document.addEventListener("click", clickOutside));
onBeforeUnmount(() => document.removeEventListener("click", clickOutside));
const has = computed(() => results.value.length > 0);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cp-citysearch relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.onInput) },
    ...{ onKeydown: (__VLS_ctx.onKeydown) },
    placeholder: (__VLS_ctx.placeholder ?? 'Rechercher une ville...'),
    ...{ class: "w-full rounded border px-3 py-2 outline-none focus:ring" },
    role: "combobox",
    'aria-expanded': (__VLS_ctx.open),
    'aria-autocomplete': "list",
    'aria-controls': (__VLS_ctx.listId),
    'aria-activedescendant': (__VLS_ctx.highlightedId),
});
(__VLS_ctx.q);
// @ts-ignore
[onInput, onKeydown, placeholder, open, listId, highlightedId, q,];
if (__VLS_ctx.open && __VLS_ctx.has) {
    // @ts-ignore
    [open, has,];
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded border bg-[var(--bg)] shadow" },
        role: "listbox",
        id: (__VLS_ctx.listId),
    });
    // @ts-ignore
    [listId,];
    for (const [c, i] of __VLS_getVForSourceType((__VLS_ctx.results))) {
        // @ts-ignore
        [results,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.open && __VLS_ctx.has))
                        return;
                    __VLS_ctx.highlighted = i;
                    // @ts-ignore
                    [highlighted,];
                } },
            ...{ onMousedown: (...[$event]) => {
                    if (!(__VLS_ctx.open && __VLS_ctx.has))
                        return;
                    __VLS_ctx.pick(c);
                    // @ts-ignore
                    [pick,];
                } },
            id: (`opt-${i}`),
            key: (c.id),
            ...{ class: (['px-3 py-2 cursor-pointer hover:bg-black/5', i === __VLS_ctx.highlighted && 'bg-black/10']) },
            role: "option",
            'aria-selected': (i === __VLS_ctx.highlighted),
        });
        // @ts-ignore
        [highlighted, highlighted,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-medium" },
        });
        (c.name);
        (c.country);
    }
}
/** @type {__VLS_StyleScopedClasses['cp-citysearch']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-80']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--bg)]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-black/5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
