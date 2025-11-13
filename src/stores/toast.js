import { reactive } from "vue";
export const toasts = reactive([]);
let id = 0;
export function pushToast(text) {
    const myId = ++id;
    toasts.push({ id: myId, text });
    setTimeout(() => {
        const i = toasts.findIndex(t => t.id === myId);
        if (i >= 0)
            toasts.splice(i, 1);
    }, 3500);
}
