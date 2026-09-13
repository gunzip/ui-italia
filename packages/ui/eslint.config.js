// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook"

import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores([
    "dist",
    "storybook-static",
    "public",
    "playwright-report",
    "test-results",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // UI library: variants/utilities legitimately live next to components.
      "react-refresh/only-export-components": "off",
      // Vendored shadcn registry components intentionally sync state in effects
      // (e.g. carousel, use-mobile); keep them aligned with upstream.
      "react-hooks/set-state-in-effect": "off",
      // Guard against hard-coded colors: use semantic tokens instead. Brand
      // assets/illustrations keep literal hex values in SVG markup (not
      // Tailwind arbitrary values), so they are intentionally not matched.
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/\\[#(?:[0-9a-fA-F]{3,8})\\]/]",
          message:
            "Hard-coded color: use a semantic token (bg-primary, text-muted-foreground, border-border…).",
        },
        {
          selector: "TemplateElement[value.raw=/\\[#(?:[0-9a-fA-F]{3,8})\\]/]",
          message:
            "Hard-coded color: use a semantic token (bg-primary, text-muted-foreground, border-border…).",
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],
])
