import { ref, onMounted, onBeforeUnmount } from 'vue';
// Simple dynamic color palette responding to dark mode.
// Uses the presence of the 'dark' class on <html>. Can be enhanced later.
export function useChartColors() {
    const isDark = ref(document.documentElement.classList.contains('dark'));
    function update() {
        isDark.value = document.documentElement.classList.contains('dark');
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaListener = () => update();
    onMounted(() => {
        media.addEventListener('change', mediaListener);
        // Mutation observer if class toggled manually
        const mo = new MutationObserver(update);
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    });
    onBeforeUnmount(() => {
        media.removeEventListener('change', mediaListener);
    });
    function palette() {
        if (isDark.value) {
            return {
                text: '#f1f5f9',
                grid: 'rgba(255,255,255,0.1)',
                border: 'rgba(255,255,255,0.2)',
                accentA: '#22c55e',
                accentB: '#0ea5e9',
                accentFillA: 'rgba(34,197,94,0.2)',
                accentFillB: 'rgba(14,165,233,0.2)',
            };
        }
        return {
            text: '#1f2937',
            grid: 'rgba(0,0,0,0.08)',
            border: 'rgba(0,0,0,0.15)',
            accentA: '#2563eb',
            accentB: '#f59e0b',
            accentFillA: 'rgba(37,99,235,0.2)',
            accentFillB: 'rgba(245,158,11,0.2)',
        };
    }
    return { isDark, palette };
}
