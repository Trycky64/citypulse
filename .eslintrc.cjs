module.exports = {
  env: { browser: true, es2022: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "prettier"
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
