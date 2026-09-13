import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "ui-italia/components/button"

export interface HeroCTA {
  label: string
  /** Accessible name; falls back to `label`. */
  title?: string
  onClick?: () => void
  href?: string
}

interface HeroBaseProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string
  subtitle?: React.ReactNode
  ctaPrimary?: HeroCTA
  ctaSecondary?: HeroCTA
  /** Swaps text and image columns (image variant only). */
  inverse?: boolean
  /** Optional background image URL. */
  background?: string
}

type HeroProps = HeroBaseProps &
  ({ type?: "text" } | { type: "image"; image: string; altText?: string })

function HeroCTAButton({ cta, outline }: { cta: HeroCTA; outline?: boolean }) {
  const className = buttonVariants({
    variant: outline ? "contrasted-outline" : "contrasted",
  })
  const ariaLabel = cta.title ?? cta.label

  if (cta.href) {
    return (
      <a href={cta.href} aria-label={ariaLabel} className={className}>
        {cta.label}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={cta.onClick}
      className={className}
    >
      {cta.label}
    </button>
  )
}

function HeroText({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: Pick<HeroBaseProps, "title" | "subtitle" | "ctaPrimary" | "ctaSecondary">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-h1 text-primary-foreground">{title}</h1>
        {typeof subtitle === "string" ? (
          <p className="text-body-lg text-primary-foreground">{subtitle}</p>
        ) : (
          subtitle
        )}
      </div>
      {ctaPrimary || ctaSecondary ? (
        <div className="flex flex-wrap gap-3">
          {ctaPrimary ? <HeroCTAButton cta={ctaPrimary} /> : null}
          {ctaSecondary ? <HeroCTAButton cta={ctaSecondary} outline /> : null}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Port of mui-italia `Hero`: full-bleed primary band with a text-only or
 * text+image layout.
 */
function Hero({ className, inverse, background, style, ...props }: HeroProps) {
  return (
    <section
      data-slot="hero"
      className={cn("bg-primary", className)}
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundSize: "cover",
        ...style,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-8 md:py-16">
        {props.type === "image" ? (
          <div className="grid grid-cols-6 gap-x-6 gap-y-10 md:grid-cols-12">
            <div
              className={cn(
                "col-span-6 my-auto",
                inverse
                  ? "md:col-span-5 md:col-start-7"
                  : "md:col-span-5 md:col-start-2"
              )}
            >
              <HeroText {...props} />
            </div>
            <div
              className={cn(
                "col-span-6 self-center",
                inverse
                  ? "md:col-span-5 md:col-start-2"
                  : "md:col-span-5 md:col-start-7"
              )}
            >
              <img
                src={props.image}
                alt={props.altText ?? ""}
                className="h-full max-h-[600px] w-full object-contain object-center select-none"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[40rem]">
            <HeroText {...props} />
          </div>
        )}
      </div>
    </section>
  )
}

export { Hero }
