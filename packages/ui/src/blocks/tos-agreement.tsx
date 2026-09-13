import * as React from "react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"

interface TOSAgreementProps extends React.ComponentProps<"section"> {
  /** Product name, rendered as the heading. */
  productName: string
  description: React.ReactNode
  onConfirm: () => void
  confirmButtonLabel?: string
  confirmButtonDisabled?: boolean
  confirmButtonError?: boolean
  children?: React.ReactNode
}

/**
 * Port of mui-italia `TOSAgreement`: centered terms-of-service acceptance
 * layout with an optional confirm button.
 */
function TOSAgreement({
  productName,
  description,
  onConfirm,
  confirmButtonLabel = "Accedi",
  confirmButtonDisabled,
  confirmButtonError = false,
  children,
  className,
  ...props
}: TOSAgreementProps) {
  return (
    <section
      data-slot="tos-agreement"
      className={cn("bg-muted py-8 lg:py-16", className)}
      {...props}
    >
      <div className="mx-auto flex max-w-[680px] flex-col gap-8 px-6 lg:gap-16 lg:px-8">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-h3 text-foreground">{productName}</h2>
          <div className="text-body text-muted-foreground">{description}</div>
        </div>
        {children}
        <div className="text-center">
          <Button
            variant={confirmButtonError ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={confirmButtonDisabled}
          >
            {confirmButtonLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}

export { TOSAgreement }
