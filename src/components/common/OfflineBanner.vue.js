import { ref, onMounted, onBeforeUnmount } from 'vue';
const offline = ref(!navigator.onLine);
function set() { offline.value = !navigator.onLine; }
onMounted(() => {
    window.addEventListener('online', set);
    window.addEventListener('offline', set);
});
onBeforeUnmount(() => {
    window.removeEventListener('online', set);
    window.removeEventListener('offline', set);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.offline) {
    // @ts-ignore
    [offline,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "fixed top-0 left-0 right-0 z-50 bg-black text-white text-center py-2 text-sm" },
    });
}
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
