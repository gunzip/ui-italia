import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Skeleton } from "ui-italia/components/skeleton"
import { Spinner } from "ui-italia/components/spinner"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-sm border-2 border-transparent bg-clip-padding",
    "font-sans font-semibold whitespace-nowrap select-none",
    "transition-colors outline-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:text-destructive",
    "min-h-6 min-w-6",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border-primary text-primary-text hover:border-current hover:text-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-dark",
        ghost:
          "text-primary-text hover:bg-action-hover hover:text-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-dark",
        "destructive-outline":
          "border-destructive text-destructive hover:border-current hover:text-destructive-dark",
        contrasted:
          "border-background bg-background text-primary-text hover:border-primary-50 hover:bg-primary-50 hover:text-primary-hover",
        "contrasted-outline":
          "border-background text-background hover:border-primary-50 hover:text-primary-50",
        link: "h-auto border-0 p-0 text-primary-text underline-offset-4 hover:text-primary-hover hover:underline",
      },
      size: {
        xs: "h-8 px-3 text-[0.75rem] leading-tight",
        "icon-xs": "size-6 p-0",
        sm: "h-10 px-5 text-[0.875rem] leading-tight",
        default: "h-12 px-6 text-base leading-tight",
        lg: "h-14 px-6 text-[1.125rem] leading-snug",
        icon: "size-12 p-0",
        "icon-sm": "size-10 p-0",
        "icon-lg": "size-14 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  loadingLabel,
  loadingType = "spinner",
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Disables the button and swaps the content for a loader (`aria-busy`). */
    loading?: boolean
    /** Accessible name announced while loading. */
    loadingLabel?: string
    loadingType?: "spinner" | "skeleton"
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">{loadingLabel ?? "Loading"}</span>
          {loadingType === "skeleton" ? (
            <Skeleton
              aria-hidden="true"
              data-slot="button-skeleton"
              className="h-4 w-16 rounded-sm"
            />
          ) : (
            <Spinner aria-hidden="true" className="size-5" />
          )}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
