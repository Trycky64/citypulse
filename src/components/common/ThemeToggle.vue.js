const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggle) },
    ...{ class: "px-3 py-1 rounded bg-[var(--primary)] text-white" },
});
// @ts-ignore
[toggle,];
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--primary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
