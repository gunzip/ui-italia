import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"

export interface CopyToClipboardButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "value" | "children"
> {
  /** Text (or a function returning it) copied to the clipboard. */
  value: string | (() => string)
  /** Accessible label in the idle state. */
  copyLabel?: string
  /** Announced after a successful copy. */
  copiedLabel?: string
}

/**
 * Port of mui-italia `CopyToClipboardButton`: icon button that copies a value
 * and shows a confirmation state for 2 seconds.
 */
function CopyToClipboardButton({
  value,
  copyLabel = "Copia",
  copiedLabel = "Copiato",
  size = "icon-sm",
  variant = "ghost",
  ...props
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => () => clearTimeout(timeout.current), [])

  const handleCopy = async () => {
    const text = typeof value === "function" ? value() : value
    try {
      await navigator.clipboard.writeText(text)
      clearTimeout(timeout.current)
      setCopied(true)
      timeout.current = setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      aria-label={copied ? copiedLabel : copyLabel}
      onClick={handleCopy}
      {...props}
    >
      {copied ? (
        <CheckIcon className="text-success" aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </Button>
  )
}

export { CopyToClipboardButton }
