import * as React from "react"
import { cn } from "cn"

import { PartyAvatar } from "./party-avatar"

export interface PartyAccountItemProps extends React.ComponentProps<"div"> {
  image?: string
  /** Party name, e.g. "Comune di Roma". */
  partyName: string
  /** User role, e.g. "Referente amministrativo". */
  partyRole?: string
  /** Label shown above the party name. */
  parentPartyName?: string
  /** When true the party name is kept on a single line. */
  noWrap?: boolean
  /** Character count above which the multi-line clamp kicks in. */
  maxCharactersNumberMultiLine?: number
}

/**
 * Port of mui-italia `PartyAccountItem`: avatar + parent name + party name +
 * role, with truncation for long names.
 */
function PartyAccountItem({
  image,
  partyName,
  partyRole,
  parentPartyName,
  noWrap = true,
  maxCharactersNumberMultiLine = 50,
  className,
  ...props
}: PartyAccountItemProps) {
  const isLong = partyName.length > maxCharactersNumberMultiLine

  return (
    <div
      data-slot="party-account-item"
      className={cn("flex flex-row select-none", className)}
      {...props}
    >
      <div className="flex items-center">
        <PartyAvatar customAlt={partyName} customSrc={image} />
      </div>
      <div className="ml-1.5 min-w-0 self-center select-text">
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
        {partyName ? (
          <p
            title={isLong ? partyName : undefined}
            className={cn(
              "text-body leading-[1.25] font-bold text-foreground",
              noWrap && "truncate",
              isLong && "line-clamp-2 whitespace-normal"
            )}
          >
            {partyName}
          </p>
        ) : null}
        {partyRole ? (
          <p className="truncate text-caption text-muted-foreground">
            {partyRole}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export { PartyAccountItem }
