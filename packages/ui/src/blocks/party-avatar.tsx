import * as React from "react"
import { LandmarkIcon } from "lucide-react"
import { cn } from "cn"

interface PartyAvatarProps extends React.ComponentProps<"div"> {
  /** Logo URL. When missing, a fallback icon is shown. */
  customSrc?: string
  /** Alt text for the logo. */
  customAlt?: string
  /** Diameter in pixels. */
  size?: number
}

/**
 * Port of mui-italia `PartyAvatar`: circular logo with inner border and a
 * fallback icon when no image is provided.
 */
function PartyAvatar({
  customSrc,
  customAlt,
  size = 48,
  className,
  ...props
}: PartyAvatarProps) {
  return (
    <div
      data-slot="party-avatar"
      className={cn(
        "relative box-border flex shrink-0 items-center justify-center rounded-full p-1.5 text-text-disabled",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_var(--border)] after:content-['']",
        customSrc ? "bg-card" : "bg-muted",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      {customSrc ? (
        <img
          src={customSrc}
          alt={customAlt ?? ""}
          className="size-full object-contain object-center"
        />
      ) : (
        <LandmarkIcon aria-hidden="true" className="size-6" />
      )}
    </div>
  )
}

export { PartyAvatar }
