import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig(
  eslint.configs.recommended,
  // tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "*.js",
      "**/.react-router",
    ],
  },
  {
    // files: ["**/*.ts", "**/*.tsx"], // <--- Only check ts, tsx
    languageOptions: {
      globals: {
        ...globals.browser, // Adds 'window', 'console', 'URL', etc.
        ...globals.node, // Adds 'process', 'module', etc.
      },
    },
    rules: {
      // Add your custom rules here
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "off",
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
    },
  },
);
