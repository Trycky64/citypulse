import { defineStore } from "pinia";

type TempUnit = "C"|"F";
interface CityRef { id: string; name: string; country: string; lat: number; lon: number; }

export const usePrefs = defineStore("prefs", {
  state: () => ({
    tempUnit: "C" as TempUnit,
    favorites: [] as CityRef[],
  }),
  actions: {
    setTempUnit(u: TempUnit){ this.tempUnit = u; this.persist(); },
    toggleFavorite(c: CityRef){
      const i = this.favorites.findIndex(x=>x.lat===c.lat && x.lon===c.lon && x.name===c.name);
      if(i>=0) this.favorites.splice(i,1); else this.favorites.push(c);
      this.persist();
    },
    isFav(c: CityRef){ return this.favorites.some(x=>x.lat===c.lat && x.lon===c.lon && x.name===c.name); },
    persist(){
      localStorage.setItem("citypulse_prefs", JSON.stringify({
        tempUnit: this.tempUnit, favorites: this.favorites
      }));
    },
    load(){
      try{
        const raw = localStorage.getItem("citypulse_prefs");
        if(!raw) return;
        const d = JSON.parse(raw);
        this.tempUnit = d.tempUnit ?? this.tempUnit;
        this.favorites = d.favorites ?? [];
      }catch{}
    }
  }
});
