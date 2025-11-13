import { ref } from 'vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
const open = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex h-14 items-center justify-between" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "flex items-center gap-2" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "flex items-center gap-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "@/assets/logo.svg",
    alt: "CityPulse",
    ...{ class: "h-6 w-auto" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "hidden md:flex items-center gap-4 text-sm" },
});
const __VLS_5 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/",
}));
const __VLS_7 = __VLS_6({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
var __VLS_8;
const __VLS_10 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/compare",
}));
const __VLS_12 = __VLS_11({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/compare",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
var __VLS_13;
const __VLS_15 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/favorites",
}));
const __VLS_17 = __VLS_16({
    ...{ class: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white" },
    to: "/favorites",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
var __VLS_18;
/** @type {[typeof ThemeToggle, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(ThemeToggle, new ThemeToggle({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.open = !__VLS_ctx.open;
            // @ts-ignore
            [open, open,];
        } },
    ...{ class: "md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" },
    'aria-label': "Toggle navigation",
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "h-5 w-5" },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M3 6h18M3 12h18M3 18h18",
});
if (__VLS_ctx.open) {
    // @ts-ignore
    [open,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "md:hidden border-t border-gray-200 dark:border-gray-800" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-4 py-3 flex items-center gap-3" },
    });
    const __VLS_24 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/",
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    const __VLS_30 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.open))
                    return;
                __VLS_ctx.open = false;
                // @ts-ignore
                [open,];
            } });
    const { default: __VLS_31 } = __VLS_27.slots;
    var __VLS_27;
    const __VLS_32 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/compare",
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/compare",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    const __VLS_38 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.open))
                    return;
                __VLS_ctx.open = false;
                // @ts-ignore
                [open,];
            } });
    const { default: __VLS_39 } = __VLS_35.slots;
    var __VLS_35;
    const __VLS_40 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/favorites",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        ...{ class: "block text-gray-700 dark:text-gray-200" },
        to: "/favorites",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    const __VLS_46 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.open))
                    return;
                __VLS_ctx.open = false;
                // @ts-ignore
                [open,];
            } });
    const { default: __VLS_47 } = __VLS_43.slots;
    var __VLS_43;
    /** @type {[typeof ThemeToggle, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(ThemeToggle, new ThemeToggle({}));
    const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
}
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-900/90']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:hover:bg-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-200']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
