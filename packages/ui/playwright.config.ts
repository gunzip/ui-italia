import { defineConfig, devices } from "@playwright/test"

const PORT = process.env.STORYBOOK_PORT ?? "6006"
const baseURL = `http://localhost:${PORT}`

/**
 * Self-hosted visual regression.
 *
 * Screenshots every Storybook story (`tests/visual`) against multiple browsers.
 * Baselines are platform-specific (Playwright default): the Linux ones are
 * committed and authoritative in CI; other platforms generate local baselines.
 *
 *   pnpm --filter ui-italia test:visual          # compare against baselines
 *   pnpm --filter ui-italia test:visual:update   # regenerate baselines
 */
export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__screenshots__",
  // Platform-specific baselines (e.g. `-linux`, `-darwin`).
  snapshotPathTemplate:
    "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}-{platform}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Projects share one Storybook dev server; serialize to avoid Vite compile contention.
  workers: 1,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  expect: {
    toHaveScreenshot: {
      // Same platform for baselines and CI: tolerate only tiny noise.
      // 3000px (~0.3% at 1280x720) absorbs sub-pixel jitter in animated
      // components (drawer/dialog shadows) without hiding real regressions.
      maxDiffPixels: 3000,
      animations: "disabled",
      caret: "hide",
    },
  },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // Firefox/WebKit baselines are intentionally out of scope for now.
    // Re-enable by adding the project and regenerating baselines on Linux.
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "pnpm storybook",
    url: `${baseURL}/index.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
