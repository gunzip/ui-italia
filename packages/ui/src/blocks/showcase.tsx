import * as React from "react"
import { cn } from "cn"

export interface ShowcaseItem {
  icon?: React.ReactNode
  title: string
  subtitle: React.ReactNode
}

interface ShowcaseProps extends React.ComponentProps<"section"> {
  title: string
  items: ShowcaseItem[]
}

/**
 * Port of mui-italia `Showcase`: centered title + a row of icon features.
 */
function Showcase({ title, items, className, ...props }: ShowcaseProps) {
  return (
    <section
      data-slot="showcase"
      className={cn("bg-muted", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-h4 text-foreground">{title}</h2>
          <ul className="flex flex-col justify-center gap-6 md:flex-row md:gap-4">
            {items.map((item, index) => (
              <li key={index} className="flex flex-1 flex-col gap-1 md:gap-4">
                {item.icon ? (
                  <span
                    aria-hidden="true"
                    className="mx-auto text-primary-hover [&_svg]:size-16"
                  >
                    {item.icon}
                  </span>
                ) : null}
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
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export { Showcase }
