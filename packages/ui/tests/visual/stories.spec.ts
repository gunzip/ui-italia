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
  const response = await request.get("/index.json")
  const index = (await response.json()) as StoryIndex

  const stories = Object.values(index.entries).filter(
    (entry) => entry.type === "story"
  )

  expect(stories.length).toBeGreaterThan(0)

  for (const story of stories) {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      fullPage: true,
      animations: "disabled",
    })
  }
})
