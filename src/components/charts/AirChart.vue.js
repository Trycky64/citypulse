import { Line } from "vue-chartjs";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
const props = defineProps();
const seriesPM25 = props.pm25.map(v => v ?? null);
const seriesPM10 = props.pm10.map(v => v ?? null);
const data = {
    labels: props.labels,
    datasets: [
        { label: "PM2.5 (µg/m³)", data: seriesPM25 },
        { label: "PM10 (µg/m³)", data: seriesPM10 },
    ],
};
const options = { responsive: true, maintainAspectRatio: false };
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
    ...{ class: "h-64" },
});
const __VLS_0 = {}.Line;
/** @type {[typeof __VLS_components.Line, ]} */ ;
// @ts-ignore
Line;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    data: (__VLS_ctx.data),
    options: (__VLS_ctx.options),
}));
const __VLS_2 = __VLS_1({
    data: (__VLS_ctx.data),
    options: (__VLS_ctx.options),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[data, options,];
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
