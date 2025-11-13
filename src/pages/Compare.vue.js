import { ref } from "vue";
import CitySearch from "@/features/search/CitySearch.vue";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
const aCity = ref(null);
const bCity = ref(null);
const aData = ref(null);
const bData = ref(null);
const loading = ref(false);
async function load() {
    if (!aCity.value || !bCity.value)
        return;
    loading.value = true;
    const [aw, aa, bw, ba] = await Promise.all([
        getWeather(aCity.value.lat, aCity.value.lon),
        getAirQuality(aCity.value.lat, aCity.value.lon),
        getWeather(bCity.value.lat, bCity.value.lon),
        getAirQuality(bCity.value.lat, bCity.value.lon),
    ]);
    aData.value = { weather: aw, air: aa };
    bData.value = { weather: bw, air: ba };
    loading.value = false;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "cp-container py-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-2xl font-semibold mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid gap-4 md:grid-cols-2 mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "font-medium mb-2" },
});
/** @type {[typeof CitySearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CitySearch, new CitySearch({
    onPick: ((c) => { __VLS_ctx.aCity = c; }),
}));
const __VLS_1 = __VLS_0({
    onPick: ((c) => { __VLS_ctx.aCity = c; }),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[aCity,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "font-medium mb-2" },
});
/** @type {[typeof CitySearch, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(CitySearch, new CitySearch({
    onPick: ((c) => { __VLS_ctx.bCity = c; }),
}));
const __VLS_5 = __VLS_4({
    onPick: ((c) => { __VLS_ctx.bCity = c; }),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
// @ts-ignore
[bCity,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.load) },
    ...{ class: "px-4 py-2 rounded bg-[var(--primary)] text-white disabled:opacity-50" },
    disabled: (!__VLS_ctx.aCity || !__VLS_ctx.bCity),
});
// @ts-ignore
[aCity, bCity, load,];
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid gap-4 md:grid-cols-2 mt-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card animate-pulse h-40" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card animate-pulse h-40" },
    });
}
else if (__VLS_ctx.aData && __VLS_ctx.bData) {
    // @ts-ignore
    [aData, bData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid gap-4 md:grid-cols-2 mt-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-medium mb-2" },
    });
    (__VLS_ctx.aCity.name);
    (__VLS_ctx.aCity.country);
    // @ts-ignore
    [aCity, aCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl font-bold" },
    });
    (Math.round(__VLS_ctx.aData.weather.now.temp));
    // @ts-ignore
    [aData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "opacity-70" },
    });
    (__VLS_ctx.aData.air.aqi);
    (__VLS_ctx.aData.air.category);
    // @ts-ignore
    [aData, aData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-medium mb-2" },
    });
    (__VLS_ctx.bCity.name);
    (__VLS_ctx.bCity.country);
    // @ts-ignore
    [bCity, bCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl font-bold" },
    });
    (Math.round(__VLS_ctx.bData.weather.now.temp));
    // @ts-ignore
    [bData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "opacity-70" },
    });
    (__VLS_ctx.bData.air.aqi);
    (__VLS_ctx.bData.air.category);
    // @ts-ignore
    [bData, bData,];
}
/** @type {__VLS_StyleScopedClasses['cp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--primary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
