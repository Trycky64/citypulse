import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cacheGet, cacheGetValid, cacheSet } from "@/services/cache";

describe("cache service memory fallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    vi.stubGlobal("indexedDB", undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("stores and retrieves values while the TTL is valid", async () => {
    await cacheSet("cache:test:valid", { city: "Paris" }, 1_000);

    await expect(cacheGet<{ city: string }>("cache:test:valid")).resolves.toEqual({
      city: "Paris",
    });
    await expect(cacheGetValid<{ city: string }>("cache:test:valid")).resolves.toEqual({
      city: "Paris",
    });
  });

  it("returns null for missing values", async () => {
    await expect(cacheGet("cache:test:missing")).resolves.toBeNull();
    await expect(cacheGetValid("cache:test:missing")).resolves.toBeNull();
  });

  it("expires values after their TTL", async () => {
    await cacheSet("cache:test:expired", "value", 1_000);
    vi.advanceTimersByTime(1_001);

    await expect(cacheGet("cache:test:expired")).resolves.toBeNull();
    await expect(cacheGetValid("cache:test:expired")).resolves.toBeNull();
  });
});
