import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CitySearch from "@/features/search/CitySearch.vue";
import { getWeather } from "@/services/weather.service";
import { getAirQuality } from "@/services/air.service";
const route = useRoute();
const router = useRouter();
// ---------------------
// Helpers encodage URL
// ---------------------
function encodeCity(c) {
    if (!c)
        return undefined;
    return encodeURIComponent(JSON.stringify({
        n: c.name,
        c: c.country,
        la: c.lat,
        lo: c.lon,
    }));
}
function decodeCity(raw) {
    if (typeof raw !== "string")
        return null;
    try {
        const obj = JSON.parse(decodeURIComponent(raw));
        if (typeof obj?.n === "string" &&
            typeof obj?.c === "string" &&
            typeof obj?.la === "number" &&
            typeof obj?.lo === "number") {
            return {
                name: obj.n,
                country: obj.c,
                lat: obj.la,
                lon: obj.lo,
            };
        }
        return null;
    }
    catch {
        return null;
    }
}
// ---------------------
// State
// ---------------------
const leftCity = ref(null);
const rightCity = ref(null);
const loadingLeft = ref(false);
const loadingRight = ref(false);
const leftWeather = ref(null);
const rightWeather = ref(null);
const leftAir = ref(null);
const rightAir = ref(null);
const leftError = ref(null);
const rightError = ref(null);
// ---------------------
// Sync route <-> state
// ---------------------
function syncFromRoute() {
    const q = route.query;
    leftCity.value = decodeCity(q.left);
    rightCity.value = decodeCity(q.right);
    if (leftCity.value)
        void loadLeftData();
    if (rightCity.value)
        void loadRightData();
}
async function updateQuery() {
    await router.replace({
        name: "compare",
        query: {
            left: encodeCity(leftCity.value),
            right: encodeCity(rightCity.value),
        },
    }).catch((err) => {
        console.error("[CityPulse] router.replace /compare failed", err);
    });
}
onMounted(() => {
    syncFromRoute();
});
watch(() => route.query, () => {
    syncFromRoute();
});
// ---------------------
// Chargement données
// ---------------------
async function loadLeftData() {
    if (!leftCity.value)
        return;
    loadingLeft.value = true;
    leftError.value = null;
    try {
        const { lat, lon } = leftCity.value;
        // use the full WeatherSummary shape
        leftWeather.value = await getWeather(lat, lon);
        leftAir.value = await getAirQuality(lat, lon);
    }
    catch (e) {
        console.error("[CityPulse] loadLeftData error", e);
        leftError.value = "Données indisponibles pour cette ville.";
    }
    finally {
        loadingLeft.value = false;
    }
}
async function loadRightData() {
    if (!rightCity.value)
        return;
    loadingRight.value = true;
    rightError.value = null;
    try {
        const { lat, lon } = rightCity.value;
        // use the full WeatherSummary shape
        rightWeather.value = await getWeather(lat, lon);
        rightAir.value = await getAirQuality(lat, lon);
    }
    catch (e) {
        console.error("[CityPulse] loadRightData error", e);
        rightError.value = "Données indisponibles pour cette ville.";
    }
    finally {
        loadingRight.value = false;
    }
}
// ---------------------
// Handlers sélection
// ---------------------
function onSelectLeft(city) {
    leftCity.value = {
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
    };
    void updateQuery();
    void loadLeftData();
}
function onSelectRight(city) {
    rightCity.value = {
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
    };
    void updateQuery();
    void loadRightData();
}
// URL actuelle pour partage
const shareUrl = computed(() => {
    if (typeof window === "undefined")
        return "";
    const url = new URL(window.location.href);
    url.searchParams.set("left", encodeCity(leftCity.value) ?? "");
    url.searchParams.set("right", encodeCity(rightCity.value) ?? "");
    return url.toString();
});
// Copier lien
async function copyLink() {
    try {
        await navigator.clipboard.writeText(shareUrl.value);
        alert("Lien de comparaison copié dans le presse-papier ✅");
    }
    catch {
        alert("Impossible de copier le lien.");
    }
}
const showQr = ref(false);
// Daily min/max helpers (getWeather returns daily as array of { tMin, tMax })
const leftDailyMin = computed(() => {
    if (!leftWeather.value)
        return NaN;
    const arr = leftWeather.value.daily.map((d) => d.tMin);
    return arr.length ? Math.min(...arr) : NaN;
});
const leftDailyMax = computed(() => {
    if (!leftWeather.value)
        return NaN;
    const arr = leftWeather.value.daily.map((d) => d.tMax);
    return arr.length ? Math.max(...arr) : NaN;
});
const rightDailyMin = computed(() => {
    if (!rightWeather.value)
        return NaN;
    const arr = rightWeather.value.daily.map((d) => d.tMin);
    return arr.length ? Math.min(...arr) : NaN;
});
const rightDailyMax = computed(() => {
    if (!rightWeather.value)
        return NaN;
    const arr = rightWeather.value.daily.map((d) => d.tMax);
    return arr.length ? Math.max(...arr) : NaN;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-6xl mx-auto px-4 py-6 space-y-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "flex items-center justify-between gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-2xl font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm opacity-70" },
});
if (__VLS_ctx.leftCity && __VLS_ctx.rightCity) {
    // @ts-ignore
    [leftCity, rightCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.copyLink) },
        type: "button",
        ...{ class: "px-3 py-1.5 rounded-md text-xs bg-blue-600 hover:bg-blue-500 text-white" },
    });
    // @ts-ignore
    [copyLink,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.leftCity && __VLS_ctx.rightCity))
                    return;
                __VLS_ctx.showQr = !__VLS_ctx.showQr;
                // @ts-ignore
                [showQr, showQr,];
            } },
        type: "button",
        ...{ class: "px-3 py-1.5 rounded-md text-xs bg-slate-800 hover:bg-slate-700" },
    });
    (__VLS_ctx.showQr ? "Masquer le QR" : "Afficher le QR");
    // @ts-ignore
    [showQr,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-2 text-sm font-medium" },
});
/** @type {[typeof CitySearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CitySearch, new CitySearch({
    onPick: (__VLS_ctx.onSelectLeft),
}));
const __VLS_1 = __VLS_0({
    onPick: (__VLS_ctx.onSelectLeft),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[onSelectLeft,];
if (__VLS_ctx.leftCity) {
    // @ts-ignore
    [leftCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 text-xs opacity-80" },
    });
    (__VLS_ctx.leftCity.name);
    (__VLS_ctx.leftCity.country);
    (__VLS_ctx.leftCity.lat.toFixed(3));
    (__VLS_ctx.leftCity.lon.toFixed(3));
    // @ts-ignore
    [leftCity, leftCity, leftCity, leftCity,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-2 text-sm font-medium" },
});
/** @type {[typeof CitySearch, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(CitySearch, new CitySearch({
    onPick: (__VLS_ctx.onSelectRight),
}));
const __VLS_5 = __VLS_4({
    onPick: (__VLS_ctx.onSelectRight),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
// @ts-ignore
[onSelectRight,];
if (__VLS_ctx.rightCity) {
    // @ts-ignore
    [rightCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 text-xs opacity-80" },
    });
    (__VLS_ctx.rightCity.name);
    (__VLS_ctx.rightCity.country);
    (__VLS_ctx.rightCity.lat.toFixed(3));
    (__VLS_ctx.rightCity.lon.toFixed(3));
    // @ts-ignore
    [rightCity, rightCity, rightCity, rightCity,];
}
if (__VLS_ctx.showQr && __VLS_ctx.leftCity && __VLS_ctx.rightCity) {
    // @ts-ignore
    [leftCity, rightCity, showQr,];
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "flex justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3 rounded-lg bg-black/20 border border-white/10 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs mb-2 opacity-80" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(__VLS_ctx.shareUrl)}`),
        alt: "QR code CityPulse compare",
        ...{ class: "mx-auto rounded bg-white" },
    });
    // @ts-ignore
    [shareUrl,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-1 break-all max-w-xs mx-auto text-[10px] opacity-50" },
    });
    (__VLS_ctx.shareUrl);
    // @ts-ignore
    [shareUrl,];
}
if (__VLS_ctx.leftCity && __VLS_ctx.rightCity) {
    // @ts-ignore
    [leftCity, rightCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card space-y-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-medium" },
    });
    (__VLS_ctx.leftCity.name);
    (__VLS_ctx.leftCity.country);
    // @ts-ignore
    [leftCity, leftCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-[11px] opacity-60" },
    });
    (__VLS_ctx.leftCity.lat.toFixed(3));
    (__VLS_ctx.leftCity.lon.toFixed(3));
    // @ts-ignore
    [leftCity, leftCity,];
    if (__VLS_ctx.loadingLeft) {
        // @ts-ignore
        [loadingLeft,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div)({
            ...{ class: "animate-pulse h-24 rounded bg-black/10" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        if (__VLS_ctx.leftError) {
            // @ts-ignore
            [leftError,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-xs text-amber-500" },
            });
            (__VLS_ctx.leftError);
            // @ts-ignore
            [leftError,];
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            if (__VLS_ctx.leftWeather) {
                // @ts-ignore
                [leftWeather,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-sm mb-2" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mb-1 font-semibold" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-xs opacity-80" },
                });
                (__VLS_ctx.leftWeather.now.temp);
                (__VLS_ctx.leftWeather.now.feels);
                // @ts-ignore
                [leftWeather, leftWeather,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-[11px] opacity-60" },
                });
                (__VLS_ctx.leftDailyMin);
                (__VLS_ctx.leftDailyMax);
                // @ts-ignore
                [leftDailyMin, leftDailyMax,];
            }
            if (__VLS_ctx.leftAir) {
                // @ts-ignore
                [leftAir,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mt-3 text-sm" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mb-1 font-semibold" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-xs opacity-80" },
                });
                (__VLS_ctx.leftAir.aqi);
                (__VLS_ctx.leftAir.category);
                // @ts-ignore
                [leftAir, leftAir,];
            }
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card space-y-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-medium" },
    });
    (__VLS_ctx.rightCity.name);
    (__VLS_ctx.rightCity.country);
    // @ts-ignore
    [rightCity, rightCity,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-[11px] opacity-60" },
    });
    (__VLS_ctx.rightCity.lat.toFixed(3));
    (__VLS_ctx.rightCity.lon.toFixed(3));
    // @ts-ignore
    [rightCity, rightCity,];
    if (__VLS_ctx.loadingRight) {
        // @ts-ignore
        [loadingRight,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div)({
            ...{ class: "animate-pulse h-24 rounded bg-black/10" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        if (__VLS_ctx.rightError) {
            // @ts-ignore
            [rightError,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-xs text-amber-500" },
            });
            (__VLS_ctx.rightError);
            // @ts-ignore
            [rightError,];
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            if (__VLS_ctx.rightWeather) {
                // @ts-ignore
                [rightWeather,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-sm mb-2" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mb-1 font-semibold" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-xs opacity-80" },
                });
                (__VLS_ctx.rightWeather.now.temp);
                (__VLS_ctx.rightWeather.now.feels);
                // @ts-ignore
                [rightWeather, rightWeather,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-[11px] opacity-60" },
                });
                (__VLS_ctx.rightDailyMin);
                (__VLS_ctx.rightDailyMax);
                // @ts-ignore
                [rightDailyMin, rightDailyMax,];
            }
            if (__VLS_ctx.rightAir) {
                // @ts-ignore
                [rightAir,];
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mt-3 text-sm" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mb-1 font-semibold" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-xs opacity-80" },
                });
                (__VLS_ctx.rightAir.aqi);
                (__VLS_ctx.rightAir.category);
                // @ts-ignore
                [rightAir, rightAir,];
            }
        }
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "text-sm opacity-70" },
    });
}
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-700']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/20']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['break-all']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
