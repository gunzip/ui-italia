import * as React from "react"
import { cn } from "cn"

import { SvgColorDark, SvgColorLight, SvgFilled, SvgOutline } from "./partials"

export type NextGenerationEUVariants = "filled" | "outline" | "color"
export type NextGenerationEUColors = "light" | "dark" | "pantone"

const colorMap = {
  dark: "var(--foreground)",
  light: "#ffffff",
  pantone: "var(--eu)",
} as const

export interface FundedByNextGenerationEUProps extends Omit<
  React.ComponentProps<"svg">,
  "title"
> {
  /** Accessible name. */
  title?: string
  /** Width of the component; height is automatic. */
  size?: number
  /** With `color` the `color` prop is ignored. */
  variant?: NextGenerationEUVariants
  color?: NextGenerationEUColors
}

export function FundedByNextGenerationEU({
  title = "Finanziato dall'Unione Europea · NextGenerationEU",
  size = 200,
  color = "dark",
  variant = "outline",
  className,
  ...props
}: FundedByNextGenerationEUProps) {
  const titleId = React.useId()

  return (
    <svg
      viewBox="0 0 1174 270"
      role="img"
      focusable="false"
      aria-labelledby={titleId}
      fill={colorMap[color]}
      style={{ width: size, maxWidth: "100%", height: "auto" }}
      className={cn("inline-block shrink-0 select-none", className)}
      {...props}
    >
      {variant === "color" ? (
        color === "light" ? (
          <SvgColorLight />
        ) : (
          <SvgColorDark />
        )
      ) : variant === "filled" ? (
        <SvgFilled />
      ) : (
        <SvgOutline />
      )}
      <title id={titleId}>{title}</title>
    </svg>
  )
}
