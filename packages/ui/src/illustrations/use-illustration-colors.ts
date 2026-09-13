import type { IllustrationProps } from "./illustration"

export interface MIIllustrationProps extends IllustrationProps {
  mode?: "light" | "dark"
}

const light = {
  colorPrimary: "#0b3ee3",
  colorSecondary: "#ced8f9",
} as const

const dark = {
  colorPrimary: "#ffffff",
  colorSecondary: "#6d8bee",
} as const

/**
 * Port of mui-italia `useIllustrationColors`.
 *
 * With no explicit `mode` the returned values are CSS variables, so the
 * illustration follows the active `.dark` scope automatically.
 */
export function useIllustrationColors(mode?: "light" | "dark") {
  if (mode === "light") return { ...light }
  if (mode === "dark") return { ...dark }
  return {
    colorPrimary: "var(--illustration-primary)",
    colorSecondary: "var(--illustration-secondary)",
  }
}
