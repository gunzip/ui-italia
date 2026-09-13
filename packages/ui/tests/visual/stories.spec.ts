import { expect, test } from "@playwright/test"

type StoryIndex = {
  entries: Record<
    string,
    { type: "story" | "docs"; id: string; title: string; name: string }
  >
}

/**
 * Captures every story as a screenshot. One test drives all stories so the
 * Storybook dev server is started once; snapshots are split per browser project.
 */
test("visual regression across all stories", async ({ page, request }) => {
  // A single test walks every story: give it room (CI already runs 3 browsers).
  test.setTimeout(10 * 60_000)

  const response = await request.get("/index.json")
  const index = (await response.json()) as StoryIndex

  const stories = Object.values(index.entries).filter(
    (entry) => entry.type === "story"
  )

  expect(stories.length).toBeGreaterThan(0)

  for (const story of stories) {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await page.waitForLoadState("load")
    // Ensure webfonts (Titillium/DM Mono) are ready before screenshotting.
    await page.evaluate(() => document.fonts.ready)
    // Let mount-time transitions settle: Base UI marks elements with
    // `data-starting-style`/`data-ending-style` while animating (dialogs,
    // drawers, popovers). Wait until none is present, then a short settle.
    await page
      .waitForFunction(
        () =>
          document.querySelectorAll(
            "[data-starting-style], [data-ending-style]"
          ).length === 0,
        undefined,
        { timeout: 3000 }
      )
      .catch(() => {})
    await page.waitForTimeout(250)
    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      fullPage: true,
      animations: "disabled",
    })
  }
})
