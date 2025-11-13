import { Line } from "vue-chartjs";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { useChartColors } from '@/components/charts/useChartColors';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
const props = defineProps();
const { palette } = useChartColors();
const data = {
    labels: props.labels,
    datasets: [
        { label: `T° min (°${props.unit ?? "C"})`, data: props.min, borderColor: () => palette().accentA, backgroundColor: () => palette().accentFillA, tension: .3, pointRadius: 3 },
        { label: `T° max (°${props.unit ?? "C"})`, data: props.max, borderColor: () => palette().accentB, backgroundColor: () => palette().accentFillB, tension: .3, pointRadius: 3 },
    ],
};
const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: { labels: { color: () => palette().text } },
        tooltip: { enabled: true },
    },
    scales: {
        x: {
            ticks: { color: () => palette().text },
            grid: { color: () => palette().grid },
        },
        y: {
            ticks: { color: () => palette().text },
            grid: { color: () => palette().grid },
            border: { color: () => palette().border }
        }
    }
};
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
