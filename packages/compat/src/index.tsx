/**
 * Optional compatibility shim.
 *
 * Re-exports MUI-Italia-like names on top of `ui-italia`, mapping the legacy
 * props to the new idiomatic API. This is meant to be **temporary**: install it
 * only if you need to migrate an app incrementally, then remove it.
 *
 * Not published to the shadcn registry.
 */
import * as React from "react"

import { Button, buttonVariants } from "ui-italia/components/button"
import { cn } from "ui-italia/lib/utils"

type LegacyVariant = "contained" | "outlined" | "text"
type LegacyColor = "primary" | "error" | "contrasted"
type LegacySize = "small" | "medium" | "large"

type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
type ButtonSize = "sm" | "default" | "lg"

function toVariant(
  variant: LegacyVariant = "contained",
  color: LegacyColor = "primary"
): ButtonVariant {
  if (color === "error") return "destructive"
  if (variant === "text") return "ghost"
  if (variant === "outlined") return "outline"
  return "default"
}

function toSize(size: LegacySize = "medium"): ButtonSize {
  if (size === "small") return "sm"
  if (size === "large") return "lg"
  return "default"
}

export interface MIButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  variant?: LegacyVariant
  color?: LegacyColor
  size?: LegacySize
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  href?: string
  isLoading?: boolean
  fullWidth?: boolean
}

function ButtonContent({
  startIcon,
  endIcon,
  children,
}: Pick<MIButtonProps, "startIcon" | "endIcon" | "children">) {
  return (
    <>
      {startIcon ? (
        <span data-icon="inline-start" aria-hidden>
          {startIcon}
        </span>
      ) : null}
      {children}
      {endIcon ? (
        <span data-icon="inline-end" aria-hidden>
          {endIcon}
        </span>
      ) : null}
    </>
  )
}

/**
 * @deprecated Use `Button` from `ui-italia/components/button`.
 */
export function MIButton({
  variant,
  color,
  size,
  startIcon,
  endIcon,
  href,
  isLoading,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: MIButtonProps) {
  const resolvedVariant = toVariant(variant, color)
  const resolvedSize = toSize(size)
  const isDisabled = disabled || isLoading
  const content = (
    <ButtonContent startIcon={startIcon} endIcon={endIcon}>
      {children}
    </ButtonContent>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(
          buttonVariants({ variant: resolvedVariant, size: resolvedSize }),
          fullWidth && "w-full",
          className
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <Button
      variant={resolvedVariant}
      size={resolvedSize}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(fullWidth && "w-full", className)}
      {...(props as React.ComponentProps<typeof Button>)}
    >
      {content}
    </Button>
  )
}
