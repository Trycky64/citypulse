import "@testing-library/jest-dom/vitest";

// provide a global userEvent() helper for older tests that call userEvent()
// without importing it. This wraps @testing-library/user-event.setup()
// try to dynamically import user-event; if it's missing, provide a small stub
let userEventLib: any = null;
try {
  // top-level await is supported in the test environment
  // avoid static import analysis by Vite by building the module name dynamically
  // eslint-disable-next-line no-await-in-loop
  const _mod = "@" + "testing-library/user-event";
  // @ts-ignore
  userEventLib = await import(_mod);
} catch (e) {
  userEventLib = null;
}

(globalThis as any).userEvent = (...args: any[]) => {
  // if we successfully imported user-event, try to return the library or a setup() instance
  if (userEventLib) {
    // some versions export a function, others export an object with setup()
    // @ts-ignore
    if (typeof userEventLib === "function") return userEventLib(...args);
    // @ts-ignore
    if (userEventLib && typeof userEventLib.setup === "function") return userEventLib.setup(...args);
    return userEventLib;
  }

  // fallback stub: minimal API used by tests (click/type)
  return {
    click: async (el: Element) => {
      const mod = await import("@testing-library/dom");
      return mod.fireEvent.click(el as any);
    },
    type: async (el: Element, text: string) => {
      const mod = await import("@testing-library/dom");
      for (const ch of text) {
        mod.fireEvent.input(el as any, { target: { value: (el as any).value + ch } });
      }
      return Promise.resolve();
    },
    setup: () => ({
      click: async (el: Element) => {
        const mod = await import("@testing-library/dom");
        return mod.fireEvent.click(el as any);
      },
      type: async (el: Element, text: string) => {
        const mod = await import("@testing-library/dom");
        for (const ch of text) {
          mod.fireEvent.input(el as any, { target: { value: (el as any).value + ch } });
        }
        return Promise.resolve();
      },
    }),
  };
};

// petit polyfill window.matchMedia si besoin
if (!window.matchMedia) {
  // @ts-ignore
  window.matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
