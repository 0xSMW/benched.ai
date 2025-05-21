// Assuming 'compat' and 'astroPlugin' are imported correctly
const { FlatCompat } = require("@eslint/eslintrc");
const astroPlugin = require("eslint-plugin-astro");


module.exports = [
  // Ignore common output and dependency directories
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  // Extend recommended configurations for ESLint and TypeScript
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
  // Custom rules for JavaScript and TypeScript files
  {
    files: ["**/*.{js,ts}"],
    rules: {
      semi: ["error", "never"],
    },
  },
  // Include Astro plugin's recommended flat config as top-level array entries
  ...astroPlugin.configs["flat/recommended"],
  // Override specific rules for Astro files
  {
    files: ["**/*.astro"],
    rules: {
      "no-unused-labels": "off",
      "semi": "off", // Disable the generic semi rule to avoid conflicts
      "astro/semi": ["error", "never"], // Use Astro-specific semi rule
    },
  },
];