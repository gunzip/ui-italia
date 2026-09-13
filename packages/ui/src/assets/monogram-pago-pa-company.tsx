import * as React from "react"
import { cn } from "cn"

export type MonogramPagoPACompanyShapes = "none" | "circle"
export type MonogramPagoPAMonogramColors =
  "primary" | "dark" | "light" | "light-primary"

const colorMap = {
  primary: "var(--secondary)",
  dark: "var(--foreground)",
  light: "#ffffff",
  "light-primary": "#ffffff",
} as const

const colorRoundedMap = {
  primary: { circle: "#ffffff", monogram: "var(--secondary)" },
  dark: { circle: "var(--foreground)", monogram: "#ffffff" },
  light: { circle: "#ffffff", monogram: "var(--foreground)" },
  "light-primary": { circle: "var(--secondary)", monogram: "#ffffff" },
} as const

const viewBoxMap = {
  none: "0 0 90 71",
  circle: "0 0 158 158",
} as const

export interface MonogramPagoPACompanyProps extends Omit<
  React.ComponentProps<"svg">,
  "title"
> {
  /** Accessible name. */
  title?: string
  /** Width of the component; height is automatic. */
  size?: number
  color?: MonogramPagoPAMonogramColors
  shape?: MonogramPagoPACompanyShapes
}

export function MonogramPagoPACompany({
  title = "PagoPA (Monogram)",
  size = 90,
  color = "primary",
  shape = "none",
  className,
  ...props
}: MonogramPagoPACompanyProps) {
  const titleId = React.useId()

  return (
    <svg
      viewBox={viewBoxMap[shape]}
      role="img"
      focusable="false"
      aria-labelledby={titleId}
      fill={colorMap[color]}
      style={{ width: size, height: "auto" }}
      className={cn("inline-block shrink-0 select-none", className)}
      {...props}
    >
      {shape === "none" ? (
        <path d="M49 0v11.388l.337-.3A24.406 24.406 0 0 1 65.5 5C79.031 5 90 15.969 90 29.5S79.031 54 65.5 54A24.411 24.411 0 0 1 49 47.611v6.498c0 6.24-2.496 12.105-6.876 16.567L41.8 71l-5.6-5.724c2.976-2.924 4.687-6.718 4.795-10.761l.005-.406v-6.401a24.384 24.384 0 0 1-16.5 6.401C10.969 54.11 0 43.12 0 29.56 0 16.002 10.969 5.01 24.5 5.01A24.384 24.384 0 0 1 41 11.412V0h8ZM24.5 13.026C15.387 13.026 8 20.43 8 29.56s7.387 16.533 16.5 16.533S41 38.691 41 29.56s-7.387-16.534-16.5-16.534Zm41-.026C56.387 13 49 20.387 49 29.5S56.387 46 65.5 46 82 38.613 82 29.5 74.613 13 65.5 13Z" />
      ) : (
        <>
          <path
            d="M79 158c43.63 0 79-35.37 79-79S122.63 0 79 0 0 35.37 0 79s35.37 79 79 79Z"
            fill={colorRoundedMap[color].circle}
          />
          <path
            d="M83 49v11.388l.337-.3A24.406 24.406 0 0 1 99.5 54c13.531 0 24.5 10.969 24.5 24.5S113.031 103 99.5 103A24.41 24.41 0 0 1 83 96.611v6.499c0 6.239-2.496 12.104-6.876 16.566L75.8 120l-5.6-5.724c2.976-2.924 4.687-6.718 4.795-10.761l.005-.405v-6.403a24.382 24.382 0 0 1-16.5 6.403c-13.531 0-24.5-10.992-24.5-24.55C34 65 44.969 54.01 58.5 54.01A24.384 24.384 0 0 1 75 60.412V49h8ZM58.5 62.026c-9.113 0-16.5 7.403-16.5 16.534s7.387 16.533 16.5 16.533S75 87.691 75 78.56s-7.387-16.534-16.5-16.534Zm41-.026C90.387 62 83 69.387 83 78.5S90.387 95 99.5 95 116 87.613 116 78.5 108.613 62 99.5 62Z"
            fill={colorRoundedMap[color].monogram}
          />
        </>
      )}
      <title id={titleId}>{title}</title>
    </svg>
  )
}
