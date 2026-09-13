import * as React from "react"
import { cn } from "cn"

import { Button, buttonVariants } from "ui-italia/components/button"

export interface InfoblockCTA {
  label: string
  title?: string
  onClick?: () => void
  href?: string
}

interface InfoblockProps extends Omit<
  React.ComponentProps<"section">,
  "title" | "content"
> {
  overline?: string
  title: string
  content?: React.ReactNode
  ctaPrimary?: InfoblockCTA
  ctaSecondary?: InfoblockCTA
  /** Swaps text and image columns. */
  inverse?: boolean
  image: string
  altText?: string
  /** Adds an elevation shadow to the image. */
  imageShadow?: boolean
  aspectRatio?: "4/3" | "9/16"
}

function InfoblockCTAButton({
  cta,
  outline,
}: {
  cta: InfoblockCTA
  outline?: boolean
}) {
  const ariaLabel = cta.title ?? cta.label
  if (cta.href) {
    return (
      <a
        href={cta.href}
        aria-label={ariaLabel}
        className={buttonVariants({ variant: outline ? "outline" : "default" })}
      >
        {cta.label}
      </a>
    )
  }
  return (
    <Button
      variant={outline ? "outline" : "default"}
      aria-label={ariaLabel}
      onClick={cta.onClick}
    >
      {cta.label}
    </Button>
  )
}

/**
 * Port of mui-italia `Infoblock`: text + image with overline, CTAs, inverse
 * layout and 4/3 or 9/16 image ratio.
 */
function Infoblock({
  overline,
  title,
  content,
  ctaPrimary,
  ctaSecondary,
  inverse = false,
  image,
  altText = "immagine",
  imageShadow = false,
  aspectRatio = "4/3",
  className,
  ...props
}: InfoblockProps) {
  return (
    <section data-slot="infoblock" className={className} {...props}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-16">
        <div className="grid grid-cols-6 gap-x-6 gap-y-10 md:grid-cols-12">
          <div
            className={cn(
              "col-span-6 my-auto",
              inverse
                ? "md:col-span-5 md:col-start-7"
                : "md:col-span-5 md:col-start-2"
            )}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {overline ? (
                  <p className="text-overline text-muted-foreground">
                    {overline}
                  </p>
                ) : null}
                <h2 className="text-h4 text-foreground">{title}</h2>
                {typeof content === "string" ? (
                  <p className="text-body text-muted-foreground">{content}</p>
                ) : (
                  content
                )}
              </div>
              {ctaPrimary || ctaSecondary ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  {ctaPrimary ? <InfoblockCTAButton cta={ctaPrimary} /> : null}
                  {ctaSecondary ? (
                    <InfoblockCTAButton cta={ctaSecondary} outline />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "col-span-6 my-auto",
              inverse
                ? "md:col-span-5 md:col-start-2"
                : "md:col-span-5 md:col-start-7"
            )}
          >
            <div
              className={cn(
                "mx-auto w-full",
                aspectRatio === "9/16" && "md:w-3/4 lg:w-1/2"
              )}
            >
              <img
                src={image}
                alt={altText}
                className={cn(
                  "h-full w-full object-cover object-center",
                  aspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-[9/16]",
                  imageShadow && "shadow-elevation-16"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Infoblock }
