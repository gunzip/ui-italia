import * as React from "react"
import { cn } from "cn"

import { Skeleton } from "ui-italia/components/skeleton"

interface BoxedModuleProps extends React.ComponentProps<"div"> {
  loading?: boolean
  /** Layout of content vs action (default: row on desktop, column on mobile). */
  direction?: "horizontal" | "vertical"
  /** Leading icon. */
  icon?: React.ReactNode
  /** Trailing action (button, link…). */
  action?: React.ReactNode
  /** Accessible label announced while loading. */
  loadingLabel?: string
}

/**
 * Port of mui-italia `MIBoxedModule`: bordered card with icon, content and an
 * optional trailing action; a skeleton state while loading.
 */
function BoxedModule({
  className,
  loading = false,
  direction,
  icon,
  action,
  loadingLabel,
  children,
  ...props
}: BoxedModuleProps) {
  return (
    <div
      data-slot="boxed-module"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-4",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">
            {loadingLabel ?? "Caricamento in corso, attendere..."}
          </span>
          <div aria-hidden="true" className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-[30%] rounded-sm" />
            <Skeleton className="h-4 w-[60%] rounded-sm" />
            <Skeleton className="h-4 w-[25%] rounded-sm" />
          </div>
        </>
      ) : (
        <>
          {icon ? (
            <span className="shrink-0 [&_svg]:size-6" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          {action ? (
            <div
              className={cn(
                "flex flex-1 gap-4",
                direction === "vertical"
                  ? "flex-col items-stretch gap-2"
                  : "max-sm:flex-col sm:flex-row sm:items-center"
              )}
            >
              <div className="flex-1 text-muted-foreground">{children}</div>
              <div className={direction === "vertical" ? "w-full" : "shrink-0"}>
                {action}
              </div>
            </div>
          ) : (
            <div className="w-full text-muted-foreground">{children}</div>
          )}
        </>
      )}
    </div>
  )
}

function BoxedModuleTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="boxed-module-title"
      className={cn("text-body font-semibold text-foreground", className)}
      {...props}
    />
  )
}

export { BoxedModule, BoxedModuleTitle }
