import { usePrefs } from "@/stores/prefs";
import { useRouter } from "vue-router";
import { cityIdFrom } from "@/utils/city-id";
const prefs = usePrefs();
const router = useRouter();
function openFav(f) {
    const id = cityIdFrom(f.lat, f.lon, f.name, f.country);
    router.push({ name: "city", params: { id } });
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
    ...{ class: "text-2xl font-semibold mb-4" },
});
if (!__VLS_ctx.prefs.favorites.length) {
    // @ts-ignore
    [prefs,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "grid md:grid-cols-2 gap-3" },
    });
    for (const [f] of __VLS_getVForSourceType((__VLS_ctx.prefs.favorites))) {
        // @ts-ignore
        [prefs,];
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.prefs.favorites.length))
                        return;
                    __VLS_ctx.openFav(f);
                    // @ts-ignore
                    [openFav,];
                } },
            key: (f.name + f.lat),
            ...{ class: "card cursor-pointer" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-medium" },
        });
        (f.name);
        (f.country);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "opacity-70 text-sm" },
        });
        (f.lat.toFixed(4));
        (f.lon.toFixed(4));
    }
}
/** @type {__VLS_StyleScopedClasses['cp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
