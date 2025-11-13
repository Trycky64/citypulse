import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
    state: () => ({ favorites: [] }),
    actions: {
        addFavorite(id) { if (!this.favorites.includes(id))
            this.favorites.push(id); },
        removeFavorite(id) { this.favorites = this.favorites.filter(x => x !== id); }
    },
});
