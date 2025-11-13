import { ref, onMounted, watch } from "vue";
import { getAirQuality } from "@/services/air.service";
const props = defineProps();
const loading = ref(true);
const error = ref(null);
const air = ref(null);
async function load() {
    try {
        loading.value = true;
        error.value = null;
        air.value = await getAirQuality(props.lat, props.lon);
        if (!air.value || air.value.samples.length === 0) {
            error.value = "Données de qualité de l’air indisponibles pour cette zone.";
        }
    }
    catch (e) {
        console.error(e);
        error.value = "Impossible de récupérer la qualité de l’air.";
    }
    finally {
        loading.value = false;
    }
}
onMounted(load);
watch(() => [props.lat, props.lon], load);
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
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "font-medium mb-2" },
});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "animate-pulse h-20 rounded bg-black/10" },
    });
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-sm text-amber-500" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
else if (__VLS_ctx.air) {
    // @ts-ignore
    [air,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-lg font-semibold" },
    });
    (__VLS_ctx.air.aqi);
    // @ts-ignore
    [air,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-sm opacity-80" },
    });
    (__VLS_ctx.air.category);
    // @ts-ignore
    [air,];
    if (__VLS_ctx.air.samples.length) {
        // @ts-ignore
        [air,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-xs opacity-70" },
        });
        (__VLS_ctx.air.samples[__VLS_ctx.air.samples.length - 1].time);
        // @ts-ignore
        [air, air,];
    }
}
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
