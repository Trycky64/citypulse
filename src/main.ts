import "./styles/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { usePrefs } from "@/stores/prefs";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

// Active le dark mode selon la préférence système
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = document.documentElement;
if (prefersDark) root.classList.add("dark");

app.use(router).use(pinia);
app.mount("#app");

// Charger les préférences après le montage (accès localStorage)
usePrefs().load();
