import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { cityFromId } from "@/utils/city-id";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
import CityMap from "@/components/city/CityMap.vue";
import TempChart from "@/components/charts/TempChart.vue";
import AirChart from "@/components/charts/AirChart.vue";
import TeleportCard from "@/components/city/TeleportCard.vue";
import { usePrefs } from "@/stores/prefs";
// pin favorites helpers separated from setup for clarity
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_export = await (async () => {
    const prefs = usePrefs();
    function toUnitCtoF(v) { return v * 9 / 5 + 32; }
    const unit = () => prefs.tempUnit; // "C" | "F"
    function maybeConvert(v) { return unit() === "F" ? toUnitCtoF(v) : v; }
    const route = useRoute();
    const city = computed(() => cityFromId(String(route.params.id)));
    const loading = ref(true);
    const error = ref(null);
    const weather = ref(null);
    const air = ref(null);
    function pinCity() {
        prefs.toggleFavorite({ id: String(route.params.id), name: city.value.name, country: city.value.country, lat: city.value.lat, lon: city.value.lon });
    }
    function isFav() {
        return prefs.favorites.some(f => f.name === city.value.name && f.country === city.value.country && f.lat === city.value.lat && f.lon === city.value.lon);
    }
    onMounted(async () => {
        try {
            loading.value = true;
            const [w, a] = await Promise.all([
                getWeather(city.value.lat, city.value.lon),
                getAirQuality(city.value.lat, city.value.lon),
            ]);
            weather.value = w;
            air.value = a;
        }
        catch (e) {
            error.value = e?.message ?? "Erreur inconnue";
        }
        finally {
            loading.value = false;
        }
    });
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
        ...{ class: "text-2xl font-semibold mb-2" },
    });
    (__VLS_ctx.city.name);
    (__VLS_ctx.city.country);
    // @ts-ignore
    [city, city,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "opacity-70 mb-4 text-sm" },
    });
    (__VLS_ctx.city.country);
    (__VLS_ctx.city.lat.toFixed(4));
    (__VLS_ctx.city.lon.toFixed(4));
    // @ts-ignore
    [city, city, city,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.pinCity) },
        'aria-label': "Ajouter ou retirer des favoris",
        ...{ class: "px-3 py-1 rounded bg-[var(--primary)] text-white mb-4 focus:ring" },
    });
    // @ts-ignore
    [pinCity,];
    (__VLS_ctx.isFav() ? "Retirer des favoris" : "Ajouter aux favoris");
    // @ts-ignore
    [isFav,];
    if (__VLS_ctx.error) {
        // @ts-ignore
        [error,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card border border-red-400 text-red-600" },
        });
        (__VLS_ctx.error);
        // @ts-ignore
        [error,];
    }
    else if (__VLS_ctx.loading) {
        // @ts-ignore
        [loading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid gap-4 md:grid-cols-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card animate-pulse h-32" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card animate-pulse h-32" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card animate-pulse h-80 md:col-span-2" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid gap-4 md:grid-cols-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-medium mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-3xl font-bold" },
        });
        (Math.round(__VLS_ctx.maybeConvert(__VLS_ctx.weather.now.temp)));
        (__VLS_ctx.unit());
        // @ts-ignore
        [maybeConvert, weather, unit,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "opacity-70" },
        });
        (Math.round(__VLS_ctx.maybeConvert(__VLS_ctx.weather.now.feels)));
        (__VLS_ctx.unit());
        // @ts-ignore
        [maybeConvert, weather, unit,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm font-medium mb-1" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "grid grid-cols-2 gap-2 text-sm" },
        });
        for (const [d] of __VLS_getVForSourceType((__VLS_ctx.weather.daily.slice(0, 5)))) {
            // @ts-ignore
            [weather,];
            __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                key: (d.date),
                ...{ class: "flex justify-between" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (new Date(d.date).toLocaleDateString());
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (Math.round(__VLS_ctx.maybeConvert(d.tMin)));
            (Math.round(__VLS_ctx.maybeConvert(d.tMax)));
            // @ts-ignore
            [maybeConvert, maybeConvert,];
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-medium mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-2xl font-bold" },
        });
        (__VLS_ctx.air.aqi);
        // @ts-ignore
        [air,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "opacity-70" },
        });
        (__VLS_ctx.air.category);
        // @ts-ignore
        [air,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card md:col-span-2" },
        });
        /** @type {[typeof CityMap, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(CityMap, new CityMap({
            lat: (__VLS_ctx.city.lat),
            lon: (__VLS_ctx.city.lon),
        }));
        const __VLS_1 = __VLS_0({
            lat: (__VLS_ctx.city.lat),
            lon: (__VLS_ctx.city.lon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        // @ts-ignore
        [city, city,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card md:col-span-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-medium mb-2" },
        });
        /** @type {[typeof TempChart, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(TempChart, new TempChart({
            labels: (__VLS_ctx.weather.daily.map((d) => new Date(d.date).toLocaleDateString())),
            min: (__VLS_ctx.weather.daily.map((d) => Math.round(__VLS_ctx.maybeConvert(d.tMin)))),
            max: (__VLS_ctx.weather.daily.map((d) => Math.round(__VLS_ctx.maybeConvert(d.tMax)))),
            unit: (__VLS_ctx.unit()),
        }));
        const __VLS_5 = __VLS_4({
            labels: (__VLS_ctx.weather.daily.map((d) => new Date(d.date).toLocaleDateString())),
            min: (__VLS_ctx.weather.daily.map((d) => Math.round(__VLS_ctx.maybeConvert(d.tMin)))),
            max: (__VLS_ctx.weather.daily.map((d) => Math.round(__VLS_ctx.maybeConvert(d.tMax)))),
            unit: (__VLS_ctx.unit()),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
        // @ts-ignore
        [maybeConvert, maybeConvert, weather, weather, weather, unit,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card md:col-span-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-medium mb-2" },
        });
        /** @type {[typeof AirChart, ]} */ ;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(AirChart, new AirChart({
            labels: (__VLS_ctx.air.samples.map((s) => new Date(s.time).toLocaleTimeString())),
            pm25: (__VLS_ctx.air.samples.map((s) => s.pm25 ?? null)),
            pm10: (__VLS_ctx.air.samples.map((s) => s.pm10 ?? null)),
        }));
        const __VLS_9 = __VLS_8({
            labels: (__VLS_ctx.air.samples.map((s) => new Date(s.time).toLocaleTimeString())),
            pm25: (__VLS_ctx.air.samples.map((s) => s.pm25 ?? null)),
            pm10: (__VLS_ctx.air.samples.map((s) => s.pm10 ?? null)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        // @ts-ignore
        [air, air, air,];
        /** @type {[typeof TeleportCard, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(TeleportCard, new TeleportCard({
            ...{ class: "md:col-span-2" },
            cityName: (__VLS_ctx.city.name),
        }));
        const __VLS_13 = __VLS_12({
            ...{ class: "md:col-span-2" },
            cityName: (__VLS_ctx.city.name),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        // @ts-ignore
        [city,];
    }
    /** @type {__VLS_StyleScopedClasses['cp-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--primary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-32']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-32']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-80']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
    return (await import('vue')).defineComponent({});
})();
export default {};
