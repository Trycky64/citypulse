import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  timeout: 15000,
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    // retry simple (1 fois) si erreur réseau
    const cfg = err.config;
    if (cfg && !cfg.__retried) {
      cfg.__retried = true;
      await new Promise((r) => setTimeout(r, 400));
      return http(cfg);
    }
    return Promise.reject(err);
  }
);
