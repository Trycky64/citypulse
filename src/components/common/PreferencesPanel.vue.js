import { usePrefs } from "@/stores/prefs";
const prefs = usePrefs();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card space-y-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "font-medium" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prefs.setTempUnit('C');
            // @ts-ignore
            [prefs,];
        } },
    type: "button",
    ...{ class: "px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900" },
    'aria-pressed': (__VLS_ctx.prefs.tempUnit === 'C'),
    ...{ class: (__VLS_ctx.prefs.tempUnit === 'C' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800') },
});
// @ts-ignore
[prefs, prefs,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prefs.setTempUnit('F');
            // @ts-ignore
            [prefs,];
        } },
    type: "button",
    ...{ class: "px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900" },
    'aria-pressed': (__VLS_ctx.prefs.tempUnit === 'F'),
    ...{ class: (__VLS_ctx.prefs.tempUnit === 'F' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800') },
});
// @ts-ignore
[prefs, prefs,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prefs.setLanguage('fr');
            // @ts-ignore
            [prefs,];
        } },
    type: "button",
    ...{ class: "px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900" },
    'aria-pressed': (__VLS_ctx.prefs.language === 'fr'),
    ...{ class: (__VLS_ctx.prefs.language === 'fr' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800') },
});
// @ts-ignore
[prefs, prefs,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prefs.setLanguage('en');
            // @ts-ignore
            [prefs,];
        } },
    type: "button",
    ...{ class: "px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900" },
    'aria-pressed': (__VLS_ctx.prefs.language === 'en'),
    ...{ class: (__VLS_ctx.prefs.language === 'en' ? 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600' : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800') },
});
// @ts-ignore
[prefs, prefs,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-sm opacity-70" },
});
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:ring-offset-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:ring-offset-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:ring-offset-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:ring-offset-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
