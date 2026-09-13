import * as React from "react"
import { LightbulbIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "ui-italia/components/button"
import { IllusPush } from "ui-italia/illustrations"

export type BannerColor = "white" | "info"
export type BannerVariant = "primary" | "secondary" | "tertiary"

export type BannerCTA =
  | { label: string; onClick: () => void }
  | { label: string; href: string; target?: "_self" | "_blank"; rel?: string }

interface BannerProps extends Omit<React.ComponentProps<"section">, "title"> {
  color?: BannerColor
  variant?: BannerVariant
  title: string
  message?: string
  badge?: string
  onClose?: () => void
  closeAriaLabel?: string
  cta?: BannerCTA
  icon?: React.ReactNode
  illustration?: React.ReactNode
}

const colorMap = {
  white: "bg-card border-border",
  info: "bg-primary-50 border-primary-100",
} as const

/**
 * Port of mui-italia `Banner`: three layouts (`primary` with illustration,
 * `secondary` with a contained CTA, `tertiary` with a top icon).
 */
function Banner({
  color = "white",
  variant = "primary",
  title,
  message,
  badge,
  onClose,
  closeAriaLabel = "Chiudi",
  cta,
  icon,
  illustration,
  className,
  ...props
}: BannerProps) {
  const titleId = React.useId()
  const horizontal = variant === "tertiary" ? true : undefined

  const ctaNode = cta ? (
    "href" in cta ? (
      <a
        href={cta.href}
        target={cta.target}
        rel={cta.rel}
        className={buttonVariants({
          variant: variant === "secondary" ? "default" : "link",
        })}
      >
        {cta.label}
      </a>
    ) : (
      <button
        type="button"
        onClick={cta.onClick}
        className={buttonVariants({
          variant: variant === "secondary" ? "default" : "link",
        })}
      >
        {cta.label}
      </button>
    )
  ) : null

  return (
    <section
      data-slot="banner"
      aria-labelledby={titleId}
      className={cn(
        "relative flex rounded-lg border p-4",
        horizontal
          ? "flex-row items-start"
          : "flex-col md:flex-row md:items-start",
        colorMap[color],
        className
      )}
      {...props}
    >
      {variant === "primary" ? (
        <div aria-hidden="true" className="shrink-0">
          {illustration ?? <IllusPush size={80} />}
        </div>
      ) : null}

      {variant === "tertiary" ? (
        <span aria-hidden="true" className="shrink-0 text-primary">
          {icon ?? <LightbulbIcon className="size-5" />}
        </span>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col gap-4",
          variant === "tertiary" &&
            "items-center text-center md:items-start md:text-left"
        )}
      >
        <div className="flex flex-col gap-1">
          {badge ? (
            <span className="text-overline text-muted-foreground">{badge}</span>
          ) : null}
          <h3 id={titleId} className="text-h6 text-foreground">
            {title}
          </h3>
          {message ? (
            <p className="text-body text-muted-foreground">{message}</p>
          ) : null}
        </div>
        {ctaNode}
      </div>

      {onClose ? (
        <button
          type="button"
          aria-label={closeAriaLabel}
          onClick={onClose}
          className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <XIcon aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </section>
  )
}

export { Banner }
