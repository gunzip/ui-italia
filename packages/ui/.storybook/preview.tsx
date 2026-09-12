import type { Preview } from "@storybook/react-vite"

// Design-system styles (Tailwind v4 + Italia tokens).
import "../src/styles/globals.css"

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
}

export default preview
