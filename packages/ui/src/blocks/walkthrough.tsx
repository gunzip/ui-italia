import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "cn"

export interface WalkthroughItem {
  icon?: React.ReactNode
  title: string
  subtitle: React.ReactNode
  /** When false the step number is omitted. */
  isSequential?: boolean
}

interface WalkthroughProps extends Omit<
  React.ComponentProps<"section">,
  "title"
> {
  title: string
  items: WalkthroughItem[]
}

/**
 * Port of mui-italia `Walkthrough`: horizontally scrollable numbered steps.
 */
function Walkthrough({ title, items, className, ...props }: WalkthroughProps) {
  return (
    <section
      data-slot="walkthrough"
      className={cn("bg-muted", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-h4 text-foreground">{title}</h2>
          <ol
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:justify-center md:overflow-visible"
          >
            {items.map((item, index) => {
              const sequential = item.isSequential ?? true
              const next = items[index + 1]
              const showArrow =
                index < items.length - 1 &&
                sequential &&
                (next.isSequential ?? true)
              return (
                <li
                  key={index}
                  className="flex min-w-[80%] flex-1 snap-start flex-col gap-2 sm:min-w-[40%] md:min-w-0"
                >
                  {sequential ? (
                    <span className="text-caption text-primary-hover">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  ) : (
                    <span className="mt-2.5" />
                  )}
                  <div className="flex items-center justify-between text-primary-hover">
                    {item.icon ? (
                      <span aria-hidden="true" className="[&_svg]:size-16">
                        {item.icon}
                      </span>
                    ) : (
                      <span />
                    )}
                    {showArrow ? (
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-8 shrink-0"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h6 text-foreground">{item.title}</h3>
                    {typeof item.subtitle === "string" ? (
                      <p className="text-body text-muted-foreground">
                        {item.subtitle}
                      </p>
                    ) : (
                      item.subtitle
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export { Walkthrough }
