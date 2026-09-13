import * as React from "react"
import { cn } from "cn"

type LinkProps = React.ComponentProps<"a"> & {
  /**
   * Underline behaviour, like MUI `Link`:
   * `always` (default), `hover`, `none`.
   */
  underline?: "always" | "hover" | "none"
}

/**
 * Port of mui-italia `MuiLink`: primary-coloured anchor with the MUI focus
 * pattern (outline 2px, offset 4px, radius 8px) and 4px vertical rhythm.
 */
function Link({ className, underline = "always", ...props }: LinkProps) {
  return (
    <a
      data-slot="link"
      className={cn(
        "my-1 inline-flex items-center rounded-lg py-px text-primary-text transition-colors outline-none hover:text-primary-hover",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        underline === "always" && "underline",
        underline === "hover" && "no-underline hover:underline",
        underline === "none" && "no-underline",
        className
      )}
      {...props}
    />
  )
}

export { Link }
export type { LinkProps }
