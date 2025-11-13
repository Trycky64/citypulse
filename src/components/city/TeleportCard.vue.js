import { ref, onMounted, computed } from "vue";
import { getTeleportInfo } from "@/services/teleport.service";
import TeleportRadial from "@/components/charts/TeleportRadial.vue";
const props = defineProps();
const loading = ref(true);
const error = ref(null);
const info = ref(null);
onMounted(async () => {
    try {
        loading.value = true;
        info.value = await getTeleportInfo(props.cityName);
    }
    catch (e) {
        error.value = e?.message ?? "Erreur";
    }
    finally {
        loading.value = false;
    }
});
const topCats = computed(() => (info.value?.scores?.categories ?? []).slice(0, 6));
const labels = computed(() => topCats.value.map((c) => c.name));
const scores = computed(() => topCats.value.map((c) => c.score));
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
        ...{ class: "animate-pulse h-24" },
    });
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-red-600" },
    });
}
else if (!__VLS_ctx.info?.scores) {
    // @ts-ignore
    [info,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "opacity-70" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid gap-3 md:grid-cols-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-lg font-semibold mb-1" },
    });
    (__VLS_ctx.info.scores.cityScore);
    // @ts-ignore
    [info,];
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "text-sm space-y-1" },
    });
    for (const [c] of __VLS_getVForSourceType((__VLS_ctx.topCats))) {
        // @ts-ignore
        [topCats,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (c.name),
            ...{ class: "flex justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "opacity-80" },
        });
        (c.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (c.score);
    }
    /** @type {[typeof TeleportRadial, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TeleportRadial, new TeleportRadial({
        labels: (__VLS_ctx.labels),
        scores: (__VLS_ctx.scores),
    }));
    const __VLS_1 = __VLS_0({
        labels: (__VLS_ctx.labels),
        scores: (__VLS_ctx.scores),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [labels, scores,];
}
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
