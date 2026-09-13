import * as React from "react"
import { cn } from "cn"

import { PartyAvatar } from "./party-avatar"

export interface PartyAccountItemButtonProps extends Omit<
  React.ComponentProps<"div">,
  "onClick"
> {
  image?: string
  partyName: string
  partyRole?: string
  parentPartyName?: string
  selectedItem?: boolean
  disabled?: boolean
  onAction?: () => void
  /** Slot for custom trailing state (e.g. a Tag). */
  endSlot?: React.ReactNode
  maxCharactersNumberMultiLine?: number
}

/**
 * Port of mui-italia `PartyAccountItemButton`: selectable party row with
 * avatar, name, role and an optional trailing slot.
 */
function PartyAccountItemButton({
  image,
  partyName,
  partyRole,
  parentPartyName,
  selectedItem = false,
  disabled = false,
  onAction,
  endSlot,
  maxCharactersNumberMultiLine = 50,
  className,
  ...props
}: PartyAccountItemButtonProps) {
  const isLong = partyName.length > maxCharactersNumberMultiLine

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onAction?.()
    }
  }

  return (
    <div
      data-slot="party-account-item-button"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-pressed={selectedItem || undefined}
      onClick={disabled ? undefined : onAction}
      onKeyDown={handleKeyDown}
      className={cn(
        "box-border flex w-full items-center justify-between gap-4 bg-card px-6 py-4 text-foreground transition-colors select-none",
        !disabled && "cursor-pointer hover:bg-action-hover",
        selectedItem &&
          "bg-primary/8 shadow-[inset_2px_0_0_0_var(--primary)] hover:bg-primary/12",
        disabled && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-row">
        <div className={cn("flex items-center", disabled && "opacity-50")}>
          <PartyAvatar customAlt={partyName} customSrc={image} />
        </div>
        <div className="ml-1.5 min-w-0 self-center">
          {parentPartyName ? (
            <p
              title={isLong ? parentPartyName : undefined}
              className={cn(
                "text-caption leading-[1.25] font-semibold text-foreground",
                isLong && "line-clamp-1"
              )}
            >
              {parentPartyName}
            </p>
          ) : null}
          <p
            title={isLong ? partyName : undefined}
            className={cn(
              "text-body leading-[1.25] font-bold",
              isLong ? "line-clamp-2" : "truncate"
            )}
          >
            {partyName}
          </p>
          {partyRole ? (
            <p className="truncate text-caption text-muted-foreground">
              {partyRole}
            </p>
          ) : null}
        </div>
      </div>
      {endSlot ? <div className="shrink-0">{endSlot}</div> : null}
    </div>
  )
}

export { PartyAccountItemButton }
