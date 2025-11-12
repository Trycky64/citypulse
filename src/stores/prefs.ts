import { defineStore } from "pinia";

type TempUnit = "C"|"F";
interface CityRef { id: string; name: string; country: string; lat: number; lon: number; }

export const usePrefs = defineStore("prefs", {
  state: () => ({
    tempUnit: "C" as TempUnit,
    language: "fr" as "fr"|"en",
    defaultCity: null as CityRef | null,
    favorites: [] as CityRef[],
  }),
  actions: {
    setTempUnit(u: TempUnit){ this.tempUnit = u; this.persist(); },
    setLanguage(l: "fr"|"en"){ this.language = l; this.persist(); },
    setDefaultCity(c: CityRef|null){ this.defaultCity = c; this.persist(); },
    toggleFavorite(c: CityRef){
      const i = this.favorites.findIndex(x=>x.lat===c.lat && x.lon===c.lon && x.name===c.name);
      if(i>=0) this.favorites.splice(i,1); else this.favorites.push(c);
      this.persist();
    },
    isFav(c: CityRef){ return this.favorites.some(x=>x.lat===c.lat && x.lon===c.lon && x.name===c.name); },
    isDefault(c: CityRef){ return !!(this.defaultCity && this.defaultCity.lat===c.lat && this.defaultCity.lon===c.lon && this.defaultCity.name===c.name); },
    persist(){
      localStorage.setItem("citypulse_prefs", JSON.stringify({
        tempUnit: this.tempUnit, language: this.language,
        defaultCity: this.defaultCity, favorites: this.favorites
      }));
    },
    load(){
      try{
        const raw = localStorage.getItem("citypulse_prefs");
        if(!raw) return;
        const d = JSON.parse(raw);
        this.tempUnit = d.tempUnit ?? this.tempUnit;
        this.language = d.language ?? this.language;
        this.defaultCity = d.defaultCity ?? null;
        this.favorites = d.favorites ?? [];
      }catch{}
    }
  }
});
