import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { usePrefs } from "@/stores/prefs";

const paris = {
  id: "paris",
  name: "Paris",
  country: "France",
  lat: 48.8566,
  lon: 2.3522,
};

describe("prefs store", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("persists the selected temperature unit", () => {
    const store = usePrefs();

    store.setTempUnit("F");

    expect(store.tempUnit).toBe("F");
    expect(JSON.parse(localStorage.getItem("citypulse_prefs") ?? "{}")).toMatchObject({
      tempUnit: "F",
    });
  });

  it("adds and removes favorites", () => {
    const store = usePrefs();

    store.toggleFavorite(paris);
    expect(store.isFav(paris)).toBe(true);
    expect(store.favorites).toHaveLength(1);

    store.toggleFavorite(paris);
    expect(store.isFav(paris)).toBe(false);
    expect(store.favorites).toEqual([]);
  });

  it("loads persisted preferences", () => {
    localStorage.setItem(
      "citypulse_prefs",
      JSON.stringify({ tempUnit: "F", favorites: [paris] }),
    );

    const store = usePrefs();
    store.load();

    expect(store.tempUnit).toBe("F");
    expect(store.favorites).toEqual([paris]);
  });

  it("ignores malformed persisted data without throwing", () => {
    localStorage.setItem("citypulse_prefs", "{not-json");

    const store = usePrefs();

    expect(() => store.load()).not.toThrow();
    expect(store.tempUnit).toBe("C");
    expect(store.favorites).toEqual([]);
  });
});
