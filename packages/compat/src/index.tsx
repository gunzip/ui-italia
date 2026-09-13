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

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "ui-italia/components/alert"
import { Badge } from "ui-italia/components/badge"
import { Breadcrumb } from "ui-italia/components/breadcrumb"
import { Card } from "ui-italia/components/card"
import { toast } from "ui-italia/components/sonner"
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

type BadgeVariant = NonNullable<React.ComponentProps<typeof Badge>["variant"]>

export type MIChipColor =
  "default" | "error" | "success" | "warning" | "highlight" | "neutral" | "info"
export type MIChipVariant = "filled" | "outlined"

const chipFilled: Record<MIChipColor, BadgeVariant> = {
  default: "primary",
  highlight: "highlight",
  neutral: "neutral",
  error: "destructive",
  success: "success",
  warning: "warning",
  info: "info",
}

const chipOutlined: Record<MIChipColor, BadgeVariant> = {
  default: "outline-primary",
  highlight: "outline-highlight",
  neutral: "outline",
  error: "outline-destructive",
  success: "outline-success",
  warning: "outline-warning",
  info: "outline-info",
}

export interface MIChipProps extends Omit<
  React.ComponentProps<"span">,
  "color"
> {
  color?: MIChipColor
  variant?: MIChipVariant
  label: string
  avatar?: React.ReactNode
  onDelete?: () => void
  deleteAriaLabel?: string
}

/**
 * @deprecated Use `Badge` from `ui-italia/components/badge`.
 */
export function MIChip({
  color = "default",
  variant = "filled",
  label,
  avatar,
  onDelete,
  deleteAriaLabel,
  ...props
}: MIChipProps) {
  return (
    <Badge
      variant={variant === "outlined" ? chipOutlined[color] : chipFilled[color]}
      avatar={avatar}
      onDelete={onDelete}
      deleteAriaLabel={deleteAriaLabel ?? props["aria-label"] ?? "Delete"}
      {...props}
    >
      {label}
    </Badge>
  )
}

export type MIAlertSeverity = "error" | "success" | "warning" | "info"

const alertSeverity: Record<
  MIAlertSeverity,
  React.ComponentProps<typeof Alert>["variant"]
> = {
  error: "destructive",
  success: "success",
  warning: "warning",
  info: "info",
}

export interface MIAlertAction {
  label: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export interface MIAlertProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  severity?: MIAlertSeverity
  variant?: "default" | "header"
  title?: string
  action?: MIAlertAction
}

/**
 * @deprecated Use `Alert` from `ui-italia/components/alert`.
 */
export function MIAlert({
  severity = "success",
  variant: _variant = "default",
  title,
  action,
  children,
  ...props
}: MIAlertProps) {
  // The legacy `header` variant has no ui-italia equivalent; the value is ignored.
  void _variant
  const cta = action ? (
    action.href ? (
      <a
        href={action.href}
        target={action.target}
        rel={action.rel}
        className="font-semibold underline underline-offset-4"
      >
        {action.label}
      </a>
    ) : (
      <button
        type="button"
        onClick={action.onClick}
        className="font-semibold underline underline-offset-4"
      >
        {action.label}
      </button>
    )
  ) : null

  return (
    <Alert variant={alertSeverity[severity]} {...props}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{children}</AlertDescription>
      {cta ? <AlertAction>{cta}</AlertAction> : null}
    </Alert>
  )
}

const paperRadius = {
  4: "rounded-sm",
  8: "rounded-lg",
  16: "rounded-xl",
  24: "rounded-2xl",
} as const

export interface MIPaperProps extends React.ComponentProps<"div"> {
  variant?: "flat" | "outlined"
  padding?: 16 | 24
  borderRadius?: 4 | 8 | 16 | 24
}

/**
 * @deprecated Use `Card` from `ui-italia/components/card`.
 */
export function MIPaper({
  variant = "flat",
  padding = 16,
  borderRadius = 8,
  className,
  ...props
}: MIPaperProps) {
  return (
    <Card
      className={cn(
        "gap-0 shadow-none",
        padding === 24 ? "p-6" : "p-4",
        paperRadius[borderRadius],
        variant === "outlined"
          ? "border border-border"
          : "border-0 shadow-none",
        className
      )}
      {...props}
    />
  )
}

export type MISnackbarSeverity = MIAlertSeverity

export interface MISnackbarProps {
  open: boolean
  severity?: MISnackbarSeverity
  title?: string
  description: string
  onClose: () => void
  errorCode?: string
  anchorOrigin?: unknown
}

/**
 * @deprecated Use Sonner `toast()` from `ui-italia/components/sonner`.
 */
export function MISnackbar({
  open,
  severity = "success",
  title,
  description,
}: MISnackbarProps) {
  React.useEffect(() => {
    if (!open) return
    const message = title ? `${title}. ${description}` : description
    const show =
      severity === "error"
        ? toast.error
        : severity === "warning"
          ? toast.warning
          : severity === "info"
            ? toast.info
            : toast.success
    const id = show(message)
    return () => {
      toast.dismiss(id)
    }
  }, [open, severity, title, description])

  return null
}

export interface MIBreadcrumbsProps extends React.ComponentProps<"nav"> {
  variant?: "extended" | "compact"
  backButtonLabel?: string
  backButtonAction?: () => void
}

/**
 * @deprecated Use `Breadcrumb` from `ui-italia/components/breadcrumb`.
 */
export function MIBreadcrumbs({
  variant = "extended",
  backButtonLabel = "Indietro",
  backButtonAction,
  children,
  ...props
}: MIBreadcrumbsProps) {
  return (
    <Breadcrumb {...props}>
      {variant === "compact" ? (
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            backButtonAction?.()
          }}
          className="text-body font-semibold text-primary-text underline-offset-4 hover:underline"
        >
          {backButtonLabel}
        </a>
      ) : (
        children
      )}
    </Breadcrumb>
  )
}
