import { onMounted, onBeforeUnmount, watch, ref } from "vue";
import * as L from "leaflet";
const props = defineProps();
const mapEl = ref(null);
let map = null;
let marker = null;
onMounted(() => {
    if (!mapEl.value)
        return;
    map = L.map(mapEl.value, {
        center: [props.lat, props.lon],
        zoom: 11,
        zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
    }).addTo(map);
    marker = L.marker([props.lat, props.lon]).addTo(map);
    // Fix classique : forcer le recalcul après montage
    setTimeout(() => {
        map?.invalidateSize();
    }, 0);
});
// Quand on change de ville
watch(() => [props.lat, props.lon], ([lat, lon]) => {
    if (!map)
        return;
    const newCenter = [lat, lon];
    map.setView(newCenter, map.getZoom());
    if (marker) {
        marker.setLatLng(newCenter);
    }
});
onBeforeUnmount(() => {
    map?.remove();
    map = null;
    marker = null;
});
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
    ...{ class: "w-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-white/5" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div)({
    ref: "mapEl",
    ...{ class: "w-full h-full" },
});
/** @type {typeof __VLS_ctx.mapEl} */ ;
// @ts-ignore
[mapEl,];
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:h-80']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-96']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
