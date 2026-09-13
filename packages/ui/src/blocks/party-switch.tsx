import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui-italia/components/dropdown-menu"
import { PartyAccountItemButton } from "./party-account-item-button"

export interface PartySwitchItem {
  id: string
  name: string
  productRole?: string
  logoUrl?: string
  parentName?: string
}

interface PartySwitchProps {
  currentPartyId: string
  parties: PartySwitchItem[]
  onExit?: (party: PartySwitchItem) => void
  maxCharactersNumberMultiLineItem?: number
  maxCharactersNumberMultiLineButton?: number
}

/**
 * Port of mui-italia `PartySwitch`: current party + dropdown to switch party.
 */
function PartySwitch({
  currentPartyId,
  parties,
  onExit,
  maxCharactersNumberMultiLineItem,
  maxCharactersNumberMultiLineButton,
}: PartySwitchProps) {
  const [selectedId, setSelectedId] = React.useState(currentPartyId)

  React.useEffect(() => setSelectedId(currentPartyId), [currentPartyId])

  const selected = parties.find((party) => party.id === selectedId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="link" aria-label="Seleziona ente">
            <span className="truncate">{selected?.name}</span>
            <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-90">
        {parties.map((party) => (
          <DropdownMenuItem
            key={party.id}
            onClick={() => {
              setSelectedId(party.id)
              onExit?.(party)
            }}
            className="p-0"
          >
            <PartyAccountItemButton
              partyName={party.name}
              partyRole={party.productRole}
              parentPartyName={party.parentName}
              image={party.logoUrl}
              maxCharactersNumberMultiLine={
                maxCharactersNumberMultiLineButton ??
                maxCharactersNumberMultiLineItem
              }
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { PartySwitch }
