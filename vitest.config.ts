import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  // Exclude Playwright e2e tests and node_modules test suites from the unit test run / coverage
  exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
  // use 'istanbul' provider to avoid v8 provider/tooling mismatches
  provider: "istanbul",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,vue}"],
      exclude: [
        "src/main.ts",
        "src/router/**",
        "src/**/__mocks__/**",
        "src/**/__tests__/**",
      ],
    },
  },
});
