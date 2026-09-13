import * as React from "react"
import { cn } from "cn"

import { LogoPagoPACompany } from "ui-italia/assets"
import { LangSwitch } from "./lang-switch"
import type { LangCode, Languages } from "./lang-switch"

export type LinkType = "internal" | "external"

export interface FooterLinkItem {
  label: string
  href?: string
  ariaLabel?: string
  linkType?: LinkType
  onClick?: () => void
}

export interface CompanyLink {
  href?: string
  ariaLabel?: string
  onClick?: () => void
}

export type FooterSocialIcon =
  "linkedin" | "instagram" | "threads" | "youtube" | "twitter" | "medium"

export interface PreLoginFooterSocialLink {
  icon: FooterSocialIcon
  href?: string
  title: string
  ariaLabel?: string
  onClick?: () => void
}

export interface PreLoginFooterSingleSection {
  title?: string
  links: FooterLinkItem[]
}

export interface PreLoginFooterLinks {
  aboutUs: PreLoginFooterSingleSection
  resources: PreLoginFooterSingleSection
  followUs: {
    title: string
    socialLinks: PreLoginFooterSocialLink[]
    links: FooterLinkItem[]
  }
}

const HREF_NO_OP = "#"

function FooterLink({
  item,
  className,
}: {
  item: FooterLinkItem
  className?: string
}) {
  return (
    <a
      href={item.href ?? HREF_NO_OP}
      aria-label={item.ariaLabel}
      onClick={item.onClick}
      className={cn(
        "text-caption font-semibold text-foreground underline-offset-4 hover:underline",
        className
      )}
    >
      {item.label}
    </a>
  )
}

interface FooterLangProps {
  languages: Languages
  onLanguageChanged: (lang: LangCode) => void
  currentLangCode?: LangCode
}

interface FooterLegalProps {
  content: React.ReactNode
}

/** Port of mui-italia `FooterLegal`. */
function FooterLegal({ content }: FooterLegalProps) {
  return (
    <div className="border-t border-border bg-card">
      <p className="px-2 py-2 text-center text-caption text-foreground">
        {content}
      </p>
    </div>
  )
}

/** Port of mui-italia `FooterPostLogin`. */
function FooterPostLogin({
  companyLink,
  links,
  languages,
  onLanguageChanged,
  currentLangCode,
  className,
}: {
  companyLink: CompanyLink
  links: FooterLinkItem[]
  className?: string
} & FooterLangProps) {
  return (
    <div className={cn("border-t border-border bg-card", className)}>
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 md:flex-row md:gap-3">
        <a
          href={companyLink.href ?? HREF_NO_OP}
          aria-label={companyLink.ariaLabel}
          onClick={companyLink.onClick}
          className="inline-flex"
        >
          <LogoPagoPACompany />
        </a>
        <nav className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
          {links.map((item, index) => (
            <FooterLink key={index} item={item} />
          ))}
          <LangSwitch
            languages={languages}
            onLanguageChanged={onLanguageChanged}
            currentLangCode={currentLangCode}
          />
        </nav>
      </div>
    </div>
  )
}

/** Port of mui-italia `FooterCheckout`. */
function FooterCheckout({
  companyLink,
  links,
  languages,
  onLanguageChanged,
  currentLangCode,
  className,
}: {
  companyLink: CompanyLink
  links: FooterLinkItem[]
  className?: string
} & FooterLangProps) {
  return (
    <div className={cn("bg-card p-6", className)}>
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <nav className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
          {links.map((item, index) => (
            <FooterLink key={index} item={item} />
          ))}
          <LangSwitch
            languages={languages}
            onLanguageChanged={onLanguageChanged}
            currentLangCode={currentLangCode}
          />
        </nav>
        <a
          href={companyLink.href ?? HREF_NO_OP}
          aria-label={companyLink.ariaLabel}
          onClick={companyLink.onClick}
          className="inline-flex"
        >
          <LogoPagoPACompany size={70} />
        </a>
      </div>
    </div>
  )
}

/** Port of mui-italia `FooterPreLogin` (products column omitted). */
function FooterPreLogin({
  companyLink,
  links,
  languages,
  onLanguageChanged,
  currentLangCode,
  className,
}: {
  companyLink: CompanyLink
  links: PreLoginFooterLinks
  className?: string
} & FooterLangProps) {
  return (
    <footer className={cn("border-t border-border bg-card", className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <a
            href={companyLink.href ?? HREF_NO_OP}
            aria-label={companyLink.ariaLabel}
            onClick={companyLink.onClick}
            className="inline-flex"
          >
            <LogoPagoPACompany />
          </a>
        </div>

        <nav
          aria-label={links.aboutUs.title ?? "Chi siamo"}
          className="flex flex-col gap-3"
        >
          {links.aboutUs.title ? (
            <h2 className="text-caption-strong text-foreground">
              {links.aboutUs.title}
            </h2>
          ) : null}
          {links.aboutUs.links.map((item, index) => (
            <FooterLink key={index} item={item} />
          ))}
        </nav>

        <nav
          aria-label={links.resources.title ?? "Risorse"}
          className="flex flex-col gap-3"
        >
          {links.resources.title ? (
            <h2 className="text-caption-strong text-foreground">
              {links.resources.title}
            </h2>
          ) : null}
          {links.resources.links.map((item, index) => (
            <FooterLink key={index} item={item} />
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="text-caption-strong text-foreground">
            {links.followUs.title}
          </h2>
          <ul className="flex flex-wrap items-center gap-3">
            {links.followUs.socialLinks.map((social, index) => (
              <li key={index}>
                <a
                  href={social.href ?? HREF_NO_OP}
                  aria-label={social.ariaLabel ?? social.title}
                  onClick={social.onClick}
                  className="text-caption font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {social.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            {links.followUs.links.map((item, index) => (
              <FooterLink key={index} item={item} />
            ))}
          </div>
          <LangSwitch
            languages={languages}
            onLanguageChanged={onLanguageChanged}
            currentLangCode={currentLangCode}
          />
        </div>
      </div>
    </footer>
  )
}

interface FooterProps extends FooterLangProps {
  loggedUser: boolean
  companyLink: CompanyLink
  postLoginLinks: FooterLinkItem[]
  preLoginLinks: PreLoginFooterLinks
  legalInfo: React.ReactNode
  onExit?: (exitAction: () => void) => void
}

/** Port of mui-italia `Footer`: pre-login or post-login + legal info. */
function Footer({
  loggedUser,
  companyLink,
  postLoginLinks,
  preLoginLinks,
  legalInfo,
  languages,
  onLanguageChanged,
  currentLangCode,
}: FooterProps) {
  return (
    <div data-slot="footer">
      {loggedUser ? (
        <FooterPostLogin
          companyLink={companyLink}
          links={postLoginLinks}
          languages={languages}
          onLanguageChanged={onLanguageChanged}
          currentLangCode={currentLangCode}
        />
      ) : (
        <FooterPreLogin
          companyLink={companyLink}
          links={preLoginLinks}
          languages={languages}
          onLanguageChanged={onLanguageChanged}
          currentLangCode={currentLangCode}
        />
      )}
      <FooterLegal content={legalInfo} />
    </div>
  )
}

export { Footer, FooterLegal, FooterCheckout, FooterPostLogin, FooterPreLogin }
