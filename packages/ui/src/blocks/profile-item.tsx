import * as React from "react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"

interface ProfileItemProps extends React.ComponentProps<"div"> {
  /** Label shown above the profile name. */
  caption?: string
  profileName: string
  /** Initials displayed inside the circle. */
  profileInitials: string
  switchLabel?: string
  switchAriaLabel?: string
  showSwitchProfile?: boolean
  onSwitchProfile: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * Port of mui-italia `ProfileItem`: avatar + caption + name with an optional
 * "switch profile" action. Below 160px the text collapses to the avatar.
 */
function ProfileItem({
  caption = "Stai operando come",
  profileName,
  profileInitials,
  switchLabel = "Cambia profilo",
  switchAriaLabel,
  showSwitchProfile = true,
  onSwitchProfile,
  className,
  ...props
}: ProfileItemProps) {
  const ariaLabel = switchAriaLabel ?? `${switchLabel}: ${profileName}`

  const avatar = (
    <span
      aria-hidden="true"
      className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-muted-foreground text-[23px] font-semibold text-white"
    >
      {profileInitials}
    </span>
  )

  return (
    <div
      data-slot="profile-item"
      className={cn(
        "@container flex w-full items-center justify-center gap-3 bg-card px-2 py-2 @max-[160px]:gap-0 @max-[160px]:px-1",
        className
      )}
      {...props}
    >
      {showSwitchProfile ? (
        <button
          type="button"
          aria-label={ariaLabel}
          onClick={onSwitchProfile}
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {avatar}
        </button>
      ) : (
        avatar
      )}

      <div className="min-w-0 flex-[0_1_auto] @max-[160px]:hidden">
        <span className="block text-caption leading-[1.2] text-muted-foreground">
          {caption}
        </span>
        <p
          title={profileName}
          className="truncate text-[21px] leading-[1.25] font-semibold text-foreground"
        >
          {profileName}
        </p>
        {showSwitchProfile ? (
          <Button
            variant="link"
            aria-label={ariaLabel}
            onClick={onSwitchProfile}
            className="mt-0.5 justify-start text-[15px] leading-[1.3] underline"
          >
            {switchLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export { ProfileItem }
