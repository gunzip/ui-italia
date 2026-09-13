import * as React from "react"
import { cn } from "cn"

export interface IllustrationProps extends Omit<
  React.ComponentProps<"svg">,
  "title"
> {
  /** Accessible name. When omitted the illustration is decorative. */
  title?: string
  /** Side of the square SVG (mui-italia default: 80). */
  size?: number
}

/**
 * Wrapper for the Italia illustrations (port of mui-italia `Illustration`).
 * Default fill is the Italia secondary (turquoise), like the original.
 */
export function Illustration({
  title,
  size = 80,
  className,
  children,
  ...props
}: IllustrationProps) {
  const labelled = Boolean(title)

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="var(--secondary)"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      className={cn("inline-block shrink-0 select-none", className)}
      {...props}
    >
      {labelled ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}
