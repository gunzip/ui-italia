import { defineConfig, devices } from "@playwright/test"

const PORT = process.env.STORYBOOK_PORT ?? "6006"
const baseURL = `http://localhost:${PORT}`

/**
 * Self-hosted visual regression.
 *
 * Screenshots every Storybook story (`tests/visual`) against multiple browsers.
 * Baselines live in `tests/visual/__screenshots__` and are committed to git.
 *
 *   pnpm --filter ui-italia test:visual          # compare against baselines
 *   pnpm --filter ui-italia test:visual:update   # regenerate baselines
 */
export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__screenshots__",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // WebKit ≈ Safari, for free multi-browser coverage (no vendor).
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "pnpm storybook -- --ci --quiet",
    url: `${baseURL}/index.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
