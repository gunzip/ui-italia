import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "ui-italia/components/button"

export interface HorizontalNavSection {
  icon?: React.ReactNode
  title: string
  subtitle: React.ReactNode
  cta: { label: string; title?: string; href: string }
}

interface HorizontalNavProps extends React.ComponentProps<"nav"> {
  sections: HorizontalNavSection[]
}

const backgrounds = ["bg-primary-hover", "bg-primary", "bg-primary-light"]

/**
 * Port of mui-italia `HorizontalNav`: up to three primary-shaded sections with
 * icon, title, subtitle and a call to action.
 */
function HorizontalNav({ sections, className, ...props }: HorizontalNavProps) {
  return (
    <nav
      data-slot="horizontal-nav"
      aria-label="Sezioni"
      className={cn("w-full", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4">
        <div className="col-span-12 my-auto md:col-span-10 md:col-start-2">
          <ul className="flex w-full flex-col text-center text-primary-foreground md:flex-row">
            {sections.slice(0, 3).map((section, index) => (
              <li
                key={index}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-6 px-8 py-8 md:py-16",
                  backgrounds[index] ?? "bg-primary"
                )}
              >
                {section.icon ? (
                  <span aria-hidden="true" className="[&_svg]:size-[60px]">
                    {section.icon}
                  </span>
                ) : null}
                <div className="flex flex-col gap-2">
                  <h3 className="text-h5 text-primary-foreground">
                    {section.title}
                  </h3>
                  {typeof section.subtitle === "string" ? (
                    <p className="text-body-lg text-primary-foreground">
                      {section.subtitle}
                    </p>
                  ) : (
                    section.subtitle
                  )}
                </div>
                <a
                  href={section.cta.href}
                  className={buttonVariants({ variant: "contrasted" })}
                >
                  <span>{section.cta.label}</span>
                  <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export { HorizontalNav }
