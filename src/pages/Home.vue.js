import CitySearch from "@/features/search/CitySearch.vue";
import PreferencesPanel from "@/components/common/PreferencesPanel.vue";
import { usePrefs } from "@/stores/prefs";
import { useRouter } from "vue-router";
const prefs = usePrefs();
const router = useRouter();
function openDefault() {
    if (!prefs.defaultCity)
        return;
    const ref = prefs.defaultCity;
    // reuse city-id scheme if available
    router.push({ name: "city", params: { id: btoa(unescape(encodeURIComponent(JSON.stringify(ref))).replace(/=+$/, "")) } });
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
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-3xl font-bold mb-6" },
});
if (__VLS_ctx.prefs.defaultCity) {
    // @ts-ignore
    [prefs,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card mb-6 flex items-center justify-between" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "opacity-70 text-sm" },
    });
    (__VLS_ctx.prefs.defaultCity.name);
    (__VLS_ctx.prefs.defaultCity.country);
    // @ts-ignore
    [prefs, prefs,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.openDefault) },
        ...{ class: "px-3 py-1 rounded bg-[var(--primary)] text-white transition duration-150 focus:ring" },
    });
    // @ts-ignore
    [openDefault,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "opacity-80 mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-md" },
});
/** @type {[typeof CitySearch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CitySearch, new CitySearch({
    navigateOnSelect: (true),
}));
const __VLS_1 = __VLS_0({
    navigateOnSelect: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof PreferencesPanel, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(PreferencesPanel, new PreferencesPanel({
    ...{ class: "mt-6 max-w-md" },
}));
const __VLS_5 = __VLS_4({
    ...{ class: "mt-6 max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {__VLS_StyleScopedClasses['cp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--primary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
