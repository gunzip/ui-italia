import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"

export type EnvironmentBannerColor = "white" | "info" | "warning"

const colorMap = {
  white: {
    container: "bg-card border-border text-foreground",
    icon: "text-neutral-300",
    action: "text-primary-text",
  },
  info: {
    container: "bg-primary-50 border-primary-100 text-foreground",
    icon: "text-italia-200",
    action: "text-primary-text",
  },
  warning: {
    container: "bg-warning-muted border-warning-light text-warning-strong",
    icon: "text-warning-strong",
    action: "text-warning-strong",
  },
} as const

interface EnvironmentBannerProps extends React.ComponentProps<"div"> {
  bgColor?: EnvironmentBannerColor
  title?: string
  message?: string
  icon?: React.ReactNode
  onClose?: () => void
  actionButton?: {
    label: string
    onClick: () => void
    color?: string
  }
}

/**
 * Port of mui-italia `EnvironmentBanner`: bordered banner to signal the
 * environment, with optional icon, action and close button.
 */
function EnvironmentBanner({
  bgColor = "white",
  title,
  message,
  icon,
  onClose,
  actionButton,
  className,
  ...props
}: EnvironmentBannerProps) {
  const variant = colorMap[bgColor]

  return (
    <div
      data-slot="environment-banner"
      className={cn(
        "relative flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-start",
        variant.container,
        className
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className={cn("shrink-0", variant.icon)}>
          {icon}
        </span>
      ) : null}

      <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        {title ? <p className="text-body-lg font-semibold">{title}</p> : null}
        {message ? <p className="text-body">{message}</p> : null}
        {actionButton ? (
          <Button
            variant="link"
            className={cn("self-center sm:self-start", variant.action)}
            onClick={actionButton.onClick}
            style={
              actionButton.color ? { color: actionButton.color } : undefined
            }
          >
            {actionButton.label}
          </Button>
        ) : null}
      </div>

      {onClose ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Chiudi"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <XIcon aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}

export { EnvironmentBanner }
