import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-sm border-2 border-transparent bg-clip-padding",
    "font-sans font-semibold whitespace-nowrap select-none",
    "transition-colors outline-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:text-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#0055AA]",
        outline:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--secondary),black_8%)]",
        ghost: "text-primary hover:bg-primary/8",
        destructive:
          "border-[color-mix(in_srgb,var(--destructive),transparent_60%)] text-destructive hover:bg-destructive/10",
        link: "h-auto border-0 p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
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
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
