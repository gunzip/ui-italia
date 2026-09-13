import * as React from "react"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { cn } from "cn"

export type TagVariant =
  "default" | "info" | "warning" | "error" | "success" | "only-icon"

const statusIconClass = {
  info: "text-info-dark",
  warning: "text-warning-dark",
  error: "text-destructive",
  success: "text-success-dark",
} as const

interface TagProps extends Omit<React.ComponentProps<"span">, "children"> {
  variant?: TagVariant
  /** Tag text. Required for every variant except `only-icon`. */
  value?: string
  /** `truncate` ellipsizes the value (with a tooltip), `wrap` breaks lines. */
  mode?: "truncate" | "wrap"
  /** Custom icon (leading). */
  icon?: React.ReactNode
  /** Accessible label; required for `only-icon`. */
  "aria-label"?: string
}

/**
 * Port of mui-italia `Tag`: small uppercase status chip (bordered).
 */
function Tag({
  variant = "default",
  value,
  mode,
  icon,
  className,
  "aria-label": ariaLabel,
  ...props
}: TagProps) {
  const label =
    ariaLabel ?? (variant === "default" ? "Stato: standard" : undefined)

  const statusIcon =
    variant === "info" ? (
      <InfoIcon
        role="img"
        aria-label={ariaLabel ?? "Stato: informativo"}
        className="size-3.5 shrink-0"
      />
    ) : variant === "warning" ? (
      <TriangleAlertIcon
        role="img"
        aria-label={ariaLabel ?? "Stato: avviso"}
        className="size-3.5 shrink-0"
      />
    ) : variant === "error" ? (
      <CircleAlertIcon
        role="img"
        aria-label={ariaLabel ?? "Stato: errore"}
        className="size-3.5 shrink-0"
      />
    ) : variant === "success" ? (
      <CircleCheckIcon
        role="img"
        aria-label={ariaLabel ?? "Stato: confermato"}
        className="size-3.5 shrink-0"
      />
    ) : icon ? (
      <span
        role="img"
        aria-label={label}
        aria-hidden={ariaLabel ? undefined : true}
        className={cn(
          "shrink-0 [&_svg]:size-3.5",
          variant === "only-icon" ? "text-muted-foreground" : "text-primary"
        )}
      >
        {icon}
      </span>
    ) : null

  if (variant === "only-icon") {
    return (
      <span
        data-slot="tag"
        className={cn(
          "inline-flex items-center",
          statusIconClass.info,
          className
        )}
        {...props}
      >
        {statusIcon}
      </span>
    )
  }

  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-md border border-border bg-card px-2 py-1 text-xs leading-[18px] font-semibold tracking-[0.5px] text-muted-foreground uppercase select-none",
        variant === "info" && "text-info-strong",
        variant === "warning" && "text-warning-strong",
        variant === "error" && "text-destructive-strong",
        variant === "success" && "text-success-strong",
        className
      )}
      {...props}
    >
      {statusIcon ? (
        <span
          className={cn(
            "shrink-0",
            variant in statusIconClass
              ? statusIconClass[variant as keyof typeof statusIconClass]
              : undefined
          )}
        >
          {statusIcon}
        </span>
      ) : null}
      {value ? (
        <span
          title={mode === "truncate" ? value : undefined}
          className={cn(
            mode === "truncate" && "min-w-0 truncate",
            mode === "wrap" && "break-words whitespace-normal"
          )}
        >
          {value}
        </span>
      ) : null}
    </span>
  )
}

interface TagGroupProps extends React.ComponentProps<"div"> {
  /** Show only the first N tags plus a `+K` counter. */
  visibleItems?: number
}

function TagGroup({
  children,
  visibleItems,
  className,
  ...props
}: TagGroupProps) {
  const items = React.Children.toArray(children)
  const limit = typeof visibleItems === "number" ? visibleItems : items.length
  const overflow = limit < items.length
  const visible = items.slice(0, limit)

  return (
    <div
      data-slot="tag-group"
      className={cn("flex flex-wrap items-start gap-1.5", className)}
      {...props}
    >
      {visible}
      {overflow ? <Tag value={`+${items.length - limit}`} /> : null}
    </div>
  )
}

export { Tag, TagGroup }
