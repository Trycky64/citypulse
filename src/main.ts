import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./styles/index.css";
import "leaflet/dist/leaflet.css";
import { usePrefs } from "@/stores/prefs";

const app = createApp(App);

// Pinia + router
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");

// Charger les préférences utilisateur
const prefs = usePrefs();
if (typeof prefs.load === "function") {
  prefs.load();
}

// ✅ Enregistrement du Service Worker uniquement en PROD
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.error("SW registration failed", err));
  });
}
