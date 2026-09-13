"use client"

import * as React from "react"
import { ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "ui-italia/components/input-group"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui-italia/components/sheet"
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

const PAGE_SIZE = 50

/**
 * Port of mui-italia `PartySwitch`: current party trigger + full-height drawer
 * with a search field and the list of organisations (full-screen on mobile).
 */
function PartySwitch({
  currentPartyId,
  parties,
  onExit,
  maxCharactersNumberMultiLineItem,
  maxCharactersNumberMultiLineButton,
}: PartySwitchProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(currentPartyId)
  const [filter, setFilter] = React.useState("")
  const [offset, setOffset] = React.useState(PAGE_SIZE)

  React.useEffect(() => setSelectedId(currentPartyId), [currentPartyId])
  React.useEffect(() => setOffset(PAGE_SIZE), [filter])

  const selected = parties.find((party) => party.id === selectedId)

  const filtered = React.useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return parties
    return parties.filter((party) => party.name.toLowerCase().includes(query))
  }, [filter, parties])

  const visible = filtered.slice(0, offset)

  const handleSelect = (party: PartySwitchItem) => {
    setSelectedId(party.id)
    setOpen(false)
    onExit?.(party)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget
    if (
      el.scrollHeight - el.scrollTop <= el.clientHeight + 20 &&
      filtered.length > visible.length
    ) {
      setOffset((current) => current + PAGE_SIZE)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="link"
            aria-label="Seleziona ente"
            className="gap-2"
          />
        }
      >
        <span className="truncate">{selected?.name}</span>
        <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 p-0 sm:max-w-[420px] 2xl:max-w-[35vw]"
      >
        <SheetHeader className="flex-row items-center justify-between gap-4 border-b border-border p-6">
          <SheetTitle className="text-overline text-foreground uppercase">
            Accedi per un altro ente
          </SheetTitle>
          <SheetClose
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Chiudi" />
            }
          >
            <XIcon aria-hidden="true" />
          </SheetClose>
        </SheetHeader>

        <div className="px-6 py-4">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              value={filter}
              placeholder="Cerca ente"
              aria-label="Cerca ente"
              onChange={(event) => setFilter(event.target.value)}
            />
            {filter ? (
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Elimina ricerca"
                  onClick={() => setFilter("")}
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>

        <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
          {visible.length > 0 ? (
            visible.map((party) => (
              <PartyAccountItemButton
                key={party.id}
                partyName={party.name}
                partyRole={party.productRole}
                parentPartyName={party.parentName}
                image={party.logoUrl}
                selectedItem={party.id === selectedId}
                onAction={() => handleSelect(party)}
                maxCharactersNumberMultiLine={
                  maxCharactersNumberMultiLineButton ??
                  maxCharactersNumberMultiLineItem
                }
              />
            ))
          ) : (
            <p className="px-6 py-10 text-center text-body font-bold text-muted-foreground">
              Nessun ente trovato
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { PartySwitch }
