import { defineStore } from "pinia";
export const usePrefs = defineStore("prefs", {
    state: () => ({
        tempUnit: "C",
        language: "fr",
        defaultCity: null,
        favorites: [],
    }),
    actions: {
        setTempUnit(u) { this.tempUnit = u; this.persist(); },
        setLanguage(l) { this.language = l; this.persist(); },
        setDefaultCity(c) { this.defaultCity = c; this.persist(); },
        toggleFavorite(c) {
            const i = this.favorites.findIndex(x => x.lat === c.lat && x.lon === c.lon && x.name === c.name);
            if (i >= 0)
                this.favorites.splice(i, 1);
            else
                this.favorites.push(c);
            this.persist();
        },
        isFav(c) { return this.favorites.some(x => x.lat === c.lat && x.lon === c.lon && x.name === c.name); },
        isDefault(c) { return !!(this.defaultCity && this.defaultCity.lat === c.lat && this.defaultCity.lon === c.lon && this.defaultCity.name === c.name); },
        persist() {
            localStorage.setItem("citypulse_prefs", JSON.stringify({
                tempUnit: this.tempUnit, language: this.language,
                defaultCity: this.defaultCity, favorites: this.favorites
            }));
        },
        load() {
            try {
                const raw = localStorage.getItem("citypulse_prefs");
                if (!raw)
                    return;
                const d = JSON.parse(raw);
                this.tempUnit = d.tempUnit ?? this.tempUnit;
                this.language = d.language ?? this.language;
                this.defaultCity = d.defaultCity ?? null;
                this.favorites = d.favorites ?? [];
            }
            catch { }
        }
    }
});
