import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({ favorites: [] as string[] }),
  actions: {
    addFavorite(id: string) { if (!this.favorites.includes(id)) this.favorites.push(id); },
    removeFavorite(id: string) { this.favorites = this.favorites.filter(x => x !== id); }
  },
});
