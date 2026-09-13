import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border border-l-4 px-2 py-2 text-left text-body text-card-foreground has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 sm:p-4 sm:has-[>svg]:gap-x-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "border-l-border",
        destructive: "border-l-destructive *:[svg]:text-destructive",
        success: "border-l-success *:[svg]:text-success",
        warning: "border-l-warning *:[svg]:text-warning",
        info: "border-l-info *:[svg]:text-info",
      },
      /**
       * `outlined` (default): white surface + elevation, status-coloured icon.
       * `standard`: status-tinted surface, dark icon (`MuiAlert.standard`).
       */
      appearance: {
        outlined: "bg-card shadow-elevation-4",
        standard: "",
      },
    },
    compoundVariants: [
      {
        appearance: "standard",
        variant: "default",
        class: "bg-muted *:[svg]:text-foreground!",
      },
      {
        appearance: "standard",
        variant: "destructive",
        class: "bg-destructive/16 *:[svg]:text-foreground!",
      },
      {
        appearance: "standard",
        variant: "success",
        class: "bg-success/16 *:[svg]:text-foreground!",
      },
      {
        appearance: "standard",
        variant: "warning",
        class: "bg-warning/16 *:[svg]:text-foreground!",
      },
      {
        appearance: "standard",
        variant: "info",
        class: "bg-info/16 *:[svg]:text-foreground!",
      },
    ],
    defaultVariants: {
      variant: "default",
      appearance: "outlined",
    },
  }
)

function Alert({
  className,
  variant,
  appearance,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, appearance }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "text-body font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-body text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
