import * as React from "react"
import { BookOpenIcon, CircleHelpIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"
import {
  AccountDropdown,
  type AccountDropdownAction,
  type AccountDropdownUser,
} from "./account-dropdown"

export interface RootLink {
  label: string
  href: string
  ariaLabel: string
  title: string
}

interface HeaderAccountProps extends React.ComponentProps<"div"> {
  rootLink: RootLink
  loggedUser?: AccountDropdownUser | false
  onAssistanceClick: () => void
  onLogin?: () => void
  onLogout?: () => void
  userActions?: AccountDropdownAction[]
  enableDropdown?: boolean
  enableLogin?: boolean
  enableAssistanceButton?: boolean
  onDocumentationClick?: () => void
  translationsMap?: {
    logIn?: string
    logOut?: string
    assistance?: string
    documentation?: string
  }
}

const defaults = {
  logIn: "Accedi",
  logOut: "Esci",
  assistance: "Assistenza",
  documentation: "Manuale operativo",
}

/**
 * Port of mui-italia `HeaderAccount`: top bar with root link, documentation,
 * assistance and login/logout (or the account dropdown).
 */
function HeaderAccount({
  rootLink,
  loggedUser,
  userActions,
  onAssistanceClick,
  onDocumentationClick,
  onLogout,
  onLogin,
  enableDropdown = false,
  enableLogin = true,
  enableAssistanceButton = true,
  translationsMap,
  className,
  ...props
}: HeaderAccountProps) {
  const t = { ...defaults, ...translationsMap }

  return (
    <div
      data-slot="header-account"
      className={cn(
        "flex min-h-12 items-center border-b border-border bg-card",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full items-center justify-between gap-4 px-4">
        <a
          href={rootLink.href}
          target="_blank"
          rel="noreferrer"
          aria-label={rootLink.ariaLabel}
          title={rootLink.title}
          className="text-caption font-bold text-foreground underline-offset-4 hover:underline"
        >
          {rootLink.label}
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          {onDocumentationClick ? (
            <Button variant="link" size="sm" onClick={onDocumentationClick}>
              <BookOpenIcon data-icon="inline-start" aria-hidden="true" />
              <span className="hidden sm:inline">{t.documentation}</span>
              <span className="sr-only sm:hidden">{t.documentation}</span>
            </Button>
          ) : null}

          {enableAssistanceButton ? (
            <Button variant="link" size="sm" onClick={onAssistanceClick}>
              <CircleHelpIcon data-icon="inline-start" aria-hidden="true" />
              <span className="hidden sm:inline">{t.assistance}</span>
              <span className="sr-only sm:hidden">{t.assistance}</span>
            </Button>
          ) : null}

          {enableLogin && loggedUser && enableDropdown ? (
            <AccountDropdown user={loggedUser} userActions={userActions} />
          ) : null}

          {enableLogin && loggedUser && !enableDropdown ? (
            <Button
              variant="link"
              size="sm"
              onClick={onLogout}
              aria-label={t.logOut}
            >
              {t.logOut}
            </Button>
          ) : null}

          {enableLogin && !loggedUser ? (
            <Button size="sm" onClick={onLogin} aria-label={t.logIn}>
              {t.logIn}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { HeaderAccount }
