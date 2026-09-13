import type { StorybookConfig } from "@storybook/react-vite"

import tailwindcss from "@tailwindcss/vite"

import { dirname } from "path"

import { fileURLToPath } from "url"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  // Enables the components manifest, which powers the MCP `docs` toolset
  // (docs-list / docs-show) so agents can read our component API instead of guessing.
  features: {
    componentsManifest: true,
  },
  // Compile the design system CSS (Tailwind v4 + Italia tokens) in Storybook.
  // Without this, `@import "tailwindcss"` / `@theme` / `@utility` are not processed.
  viteFinal: async (config) => {
    config.plugins ??= []
    config.plugins.push(tailwindcss())
    return config
  },
}
export default config
