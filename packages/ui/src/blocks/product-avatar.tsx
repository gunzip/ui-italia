import * as React from "react"
import { cn } from "cn"

export type ProductAvatarSize = "small" | "default" | "large"

const sizesMap: Record<
  ProductAvatarSize,
  { dimension: number; padding: number }
> = {
  small: { dimension: 32, padding: 4 },
  default: { dimension: 64, padding: 8 },
  large: { dimension: 88, padding: 16 },
}

interface ProductAvatarProps extends React.ComponentProps<"div"> {
  size?: ProductAvatarSize
  logoUrl: string
  /** Logo background color; when unset the card surface is used. */
  logoBgColor?: string
  logoAltText: string
}

/**
 * Port of mui-italia `ProductAvatar`: rounded square logo with inner border.
 */
function ProductAvatar({
  size = "default",
  logoUrl,
  logoBgColor,
  logoAltText,
  className,
  ...props
}: ProductAvatarProps) {
  const { dimension, padding } = sizesMap[size]

  return (
    <div
      data-slot="product-avatar"
      className={cn(
        "relative box-border flex shrink-0 items-center justify-center rounded-lg",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_0_1px_var(--border)] after:content-['']",
        logoBgColor ? undefined : "bg-card",
        className
      )}
      style={{
        width: dimension,
        height: dimension,
        padding,
        backgroundColor: logoBgColor,
      }}
      {...props}
    >
      <img
        src={logoUrl}
        alt={logoAltText}
        className="size-full object-contain object-center"
      />
    </div>
  )
}

export { ProductAvatar }
