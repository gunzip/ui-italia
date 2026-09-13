import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const itemVariants = cva("rounded-2xl border p-4", {
  variants: {
    variant: {
      normal: "border-border bg-card text-foreground",
      info: "border-info-strong bg-info-muted text-info-strong",
      success: "border-success-strong bg-success-muted text-success-strong",
      warning: "border-warning-strong bg-warning-muted text-warning-strong",
      error:
        "border-destructive-strong bg-destructive-muted text-destructive-strong",
    },
  },
  defaultVariants: {
    variant: "normal",
  },
})

const firstDotVariants = cva("size-3 ring-[6px] ring-foreground/20", {
  variants: {
    variant: {
      normal: "bg-foreground",
      info: "bg-info-dark",
      success: "bg-success-dark",
      warning: "bg-warning-dark",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "normal",
  },
})

export type TimelineVariant = NonNullable<
  VariantProps<typeof itemVariants>["variant"]
>

function Timeline({
  className,
  children,
  ...props
}: React.ComponentProps<"ol">) {
  const items = React.Children.toArray(children)

  return (
    <ol
      data-slot="timeline"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
              isFirst: index === 0,
              isLast: index === items.length - 1,
            })
          : child
      )}
    </ol>
  )
}

interface TimelineItemProps
  extends
    Omit<React.ComponentProps<"li">, "title">,
    VariantProps<typeof itemVariants> {
  /** Heading of the step; a primitive value is styled automatically. */
  title: React.ReactNode
  /** Decorative icon shown before the title. */
  icon?: React.ReactNode
  /** Injected by `Timeline`; not part of the public API. */
  isFirst?: boolean
  /** Injected by `Timeline`; not part of the public API. */
  isLast?: boolean
}

function TimelineItem({
  className,
  variant = "normal",
  title,
  icon,
  children,
  isFirst = false,
  isLast = false,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("flex gap-3", className)}
      {...props}
    >
      <div className="flex w-6 shrink-0 flex-col items-center">
        <span
          aria-hidden="true"
          className={cn(
            "w-px flex-1 bg-neutral-300",
            isFirst && "bg-transparent"
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rounded-full",
            isFirst ? firstDotVariants({ variant }) : "size-1.5 bg-neutral-300"
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "w-px flex-1 bg-neutral-300",
            isLast && "bg-transparent"
          )}
        />
      </div>

      <div className={cn("flex-1", isLast ? "pb-0" : "pb-4")}>
        <div className={cn(itemVariants({ variant }))}>
          <div className="flex items-center gap-3">
            {icon ? (
              <span aria-hidden="true" className="shrink-0 [&_svg]:size-6">
                {icon}
              </span>
            ) : null}
            <span className="font-semibold">{title}</span>
          </div>
          {children ? (
            <div className="mt-1 pl-9 text-caption">{children}</div>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, itemVariants }
