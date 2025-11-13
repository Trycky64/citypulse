import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("@/pages/Home.vue");
const City = () => import("@/pages/City.vue");
const Compare = () => import("@/pages/Compare.vue");
const Favorites = () => import("@/pages/Favorites.vue");
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", name: "home", component: Home },
        { path: "/city/:id", name: "city", component: City, props: true },
        { path: "/compare", name: "compare", component: Compare },
        { path: "/favorites", name: "favorites", component: Favorites },
        { path: "/:pathMatch(.*)*", redirect: "/" }
    ],
    scrollBehavior() { return { top: 0 }; }
});
export default router;
