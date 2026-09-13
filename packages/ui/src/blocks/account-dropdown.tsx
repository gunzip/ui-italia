import * as React from "react"
import { CircleUserRoundIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui-italia/components/dropdown-menu"

export interface AccountDropdownUser {
  id: string
  name?: string
  surname?: string
  email?: string
}

export interface AccountDropdownAction {
  id: string
  icon?: React.ReactNode
  label: string
  onClick: () => void
}

interface AccountDropdownProps {
  user: AccountDropdownUser
  userActions?: AccountDropdownAction[]
}

/**
 * Port of mui-italia `AccountDropdown`: user menu with icon + name.
 */
function AccountDropdown({ user, userActions }: AccountDropdownProps) {
  const fullName =
    user.name && user.surname ? `${user.name} ${user.surname}` : undefined
  const label = `Area utente ${user.name ?? ""} ${user.surname ?? ""}`.trim()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="link" aria-label={label}>
            <CircleUserRoundIcon data-icon="inline-start" aria-hidden="true" />
            <span className="hidden sm:inline">{fullName}</span>
            <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        }
      />
      {userActions && userActions.length > 0 ? (
        <DropdownMenuContent align="end">
          {userActions.map((action) => (
            <DropdownMenuItem key={action.id} onClick={action.onClick}>
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  )
}

export { AccountDropdown }
