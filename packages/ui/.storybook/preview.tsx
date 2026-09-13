import * as React from "react"
import type { Decorator, Preview } from "@storybook/react-vite"

// Design-system styles (Tailwind v4 + Italia tokens).
import "../src/styles/globals.css"

/** Italia canvas background — `theme.colors.blue[100]` in mui-italia. */
const ITALIA_CANVAS = "#ced8f9"

function usePrefersDark() {
  const [prefersDark, setPrefersDark] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setPrefersDark(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  return prefersDark
}

/**
 * Reproduces mui-italia's Storybook presentation:
 * - `canvas: italia` wraps every story in a centered `blue[100]` container
 *   (mui `StoryContainer`); `plain` keeps a neutral background.
 * - `theme: light | dark | system` toggles the `.dark` token scope, like the
 *   mui theme toolbar.
 */
const WithCanvas: Decorator = (Story, context) => {
  const selectedTheme = context.globals.theme ?? "light"
  const canvas = context.globals.canvas ?? "plain"
  const prefersDark = usePrefersDark()
  const isDark =
    selectedTheme === "dark" || (selectedTheme === "system" && prefersDark)
  const isItalia = canvas === "italia"

  // Keep the default DOM untouched (storybook root → story) so Base UI
  // portals/focus guards stay where the a11y gate expects them.
  if (!isItalia && !isDark) {
    return <Story />
  }

  return (
    <div className={isDark ? "dark" : undefined}>
      <div
        className="flex min-h-screen w-full items-center justify-center p-6 md:p-10"
        style={{
          backgroundColor: isItalia ? ITALIA_CANVAS : "var(--background)",
        }}
      >
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },

    // Viewports aligned with mui-italia's `breakpointsChromaticValues`.
    viewport: {
      options: {
        xs375: {
          name: "375 (xs)",
          styles: { width: "375px", height: "812px" },
        },
        sm640: {
          name: "640 (sm)",
          styles: { width: "640px", height: "900px" },
        },
        md900: {
          name: "900 (md)",
          styles: { width: "900px", height: "1000px" },
        },
        lg1200: {
          name: "1200 (lg)",
          styles: { width: "1200px", height: "1000px" },
        },
        xl1600: {
          name: "1600 (xl)",
          styles: { width: "1600px", height: "1000px" },
        },
      },
    },
  },

  globalTypes: {
    canvas: {
      name: "Canvas",
      description:
        "Italia canvas (blue, centered, like mui-italia) or plain background",
      defaultValue: "plain",
      toolbar: {
        icon: "contrast",
        title: "Canvas",
        items: [
          { value: "plain", title: "Plain" },
          { value: "italia", title: "Italia" },
        ],
      },
    },
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        title: "Theme",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
          { value: "system", icon: "cog", title: "System" },
        ],
      },
    },
  },

  decorators: [WithCanvas],
}

export default preview
