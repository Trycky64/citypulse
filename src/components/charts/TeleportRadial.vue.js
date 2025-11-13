import { Radar } from "vue-chartjs";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { useChartColors } from '@/components/charts/useChartColors';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
const props = defineProps();
const { palette } = useChartColors();
const data = {
    labels: props.labels,
    datasets: [
        {
            label: "Scores",
            data: props.scores,
            fill: true,
            backgroundColor: () => palette().accentFillA,
            borderColor: () => palette().accentA,
            pointBackgroundColor: () => palette().accentA,
            pointBorderColor: () => palette().text,
        },
    ],
};
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: { stepSize: 2, color: () => palette().text },
            grid: { color: () => palette().grid },
            angleLines: { color: () => palette().grid },
            pointLabels: { color: () => palette().text }
        },
    },
    plugins: {
        legend: { labels: { color: () => palette().text } },
        tooltip: { enabled: true }
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
    ...{ class: "h-56" },
});
const __VLS_0 = {}.Radar;
/** @type {[typeof __VLS_components.Radar, ]} */ ;
// @ts-ignore
Radar;
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
/** @type {__VLS_StyleScopedClasses['h-56']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
