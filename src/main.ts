import "./styles/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Dark mode selon préférence utilisateur
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = document.documentElement;
if (prefersDark) root.classList.add("dark");

app.use(router);
app.mount("#app");
