import * as React from "react"
import { LightbulbIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Badge } from "ui-italia/components/badge"
import { buttonVariants } from "ui-italia/components/button"
import { IllusPush } from "ui-italia/illustrations"

export type BannerColor = "white" | "info"
export type BannerVariant = "primary" | "secondary" | "tertiary"

export type BannerCTA =
  | { label: string; onClick: () => void }
  | {
      label: string
      href: string
      target?: "_self" | "_blank"
      rel?: string
    }

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

function BannerCta({
  cta,
  contained,
  tertiary,
  className,
}: {
  cta: BannerCTA
  contained: boolean
  tertiary: boolean
  className?: string
}) {
  const classes = cn(
    contained
      ? buttonVariants({ variant: "default", size: "sm" })
      : cn(
          "rounded-lg p-0 font-semibold underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          tertiary ? "text-body" : "text-caption-strong",
          "text-primary-text hover:text-primary-hover"
        ),
    contained && "px-4",
    className
  )

  if ("href" in cta) {
    return (
      <a href={cta.href} target={cta.target} rel={cta.rel} className={classes}>
        {cta.label}
      </a>
    )
  }

  return (
    <button type="button" onClick={cta.onClick} className={classes}>
      {cta.label}
    </button>
  )
}

function CloseButton({
  onClose,
  ariaLabel,
}: {
  onClose: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex size-8 shrink-0 items-center justify-center rounded-sm text-foreground outline-none hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <XIcon aria-hidden="true" className="size-5" />
      <span className="sr-only">{ariaLabel}</span>
    </button>
  )
}

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

  const titleClass = cn(
    "leading-[1.2] font-bold [overflow-wrap:anywhere] break-words text-foreground",
    variant === "tertiary" ? "text-body" : "text-[18px] sm:text-2xl"
  )
  const messageClass = cn(
    "[overflow-wrap:anywhere] break-words text-muted-foreground",
    variant === "tertiary" ? "text-caption" : "text-body"
  )

  const titleNode = (
    <h3 id={titleId} className={titleClass}>
      {title}
    </h3>
  )
  const messageNode = message ? <p className={messageClass}>{message}</p> : null

  const closeNode = onClose ? (
    <CloseButton onClose={onClose} ariaLabel={closeAriaLabel} />
  ) : null

  return (
    <section
      data-slot="banner"
      aria-labelledby={titleId}
      className={cn(
        "w-full rounded-lg border p-4 text-foreground",
        colorMap[color],
        className
      )}
      {...props}
    >
      {variant === "primary" ? (
        <div className="flex items-stretch">
          <span
            aria-hidden="true"
            className="mr-4 w-1 shrink-0 self-stretch rounded-full bg-primary"
          />
          <div className="flex w-full justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {badge ? (
                <Badge variant="highlight" className="self-start">
                  {badge}
                </Badge>
              ) : null}
              {titleNode}
              {messageNode}
              {cta ? (
                <BannerCta
                  cta={cta}
                  contained={false}
                  tertiary={false}
                  className="mt-1 self-start"
                />
              ) : null}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-4">
              {closeNode}
              <div className="mt-auto flex size-14 items-end justify-end sm:size-20 [&>img]:size-full [&>img]:object-contain [&>svg]:size-full">
                {illustration ?? <IllusPush />}
              </div>
            </div>
          </div>
        </div>
      ) : variant === "secondary" ? (
        <div className="flex w-full justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {titleNode}
            {messageNode}
            {cta ? (
              <BannerCta
                cta={cta}
                contained
                tertiary={false}
                className="mt-1 self-start sm:hidden"
              />
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-4">
            {closeNode}
            {cta ? (
              <BannerCta
                cta={cta}
                contained
                tertiary={false}
                className="mt-auto hidden self-end sm:inline-flex"
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary/40"
            >
              {icon ?? <LightbulbIcon className="size-5" />}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {titleNode}
              {messageNode}
              {cta ? (
                <BannerCta
                  cta={cta}
                  contained={false}
                  tertiary
                  className="mt-0.5 self-start"
                />
              ) : null}
            </div>
          </div>
          {closeNode}
        </div>
      )}
    </section>
  )
}

export { Banner }
