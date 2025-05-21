const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const astroPlugin = require("eslint-plugin-astro");

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  baseDirectory: __dirname,
});

module.exports = [
  // Ignore output and dependency directories
  {
    ignores: ["node_modules/**", "dist/**", "eslint.config.cjs", ".astro/**"],
  },
  // Extend built-in and TypeScript recommended configs
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended"
  ),
  // Rules for JavaScript and TypeScript files
  {
    files: ["**/*.{js,ts}"],
    rules: {
      semi: ["error", "never"],
    },
  },
  // Configuration for scripts
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
  },
  // Astro-specific overrides
  {
    files: ["**/*.astro"],
    rules: {
      "no-unused-labels": "off",
      semi: "off", // Disable generic semi rule
      "astro/semi": ["error", "never"],
    },
  },
];
