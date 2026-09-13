import * as React from "react"
import { z } from "zod"
import { cn } from "cn"

import { FundedByNextGenerationEU, LogoPagoPACompany } from "ui-italia/assets"
import {
  InstagramIcon,
  LinkedinIcon,
  MediumIcon,
  ThreadsIcon,
  TwitterIcon,
  YoutubeIcon,
} from "ui-italia/icons"
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

export const PRODUCTS_JSON_URL =
  "https://selfcare.pagopa.it/assets/products.json"

/** Product entry loaded from `productsJsonUrl` (`FooterPreLogin`). */
const productSchema = z.object({
  label: z.string(),
  href: z.string(),
  ariaLabel: z.string().optional(),
  linkType: z.enum(["internal", "external"]).optional(),
})

const productsSchema = z.array(productSchema)

export type FooterProduct = z.infer<typeof productSchema>

const socialIcons: Record<FooterSocialIcon, React.ReactNode> = {
  linkedin: <LinkedinIcon />,
  instagram: <InstagramIcon />,
  threads: <ThreadsIcon />,
  youtube: <YoutubeIcon />,
  twitter: <TwitterIcon />,
  medium: <MediumIcon />,
}

function FooterLink({
  item,
  className,
}: {
  item: FooterLinkItem
  className?: string
}) {
  return (
    <a
      href={item.href ?? "#"}
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
          href={companyLink.href ?? "#"}
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
          href={companyLink.href ?? "#"}
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

interface FooterPreLoginProps extends FooterLangProps {
  companyLink: CompanyLink
  links: PreLoginFooterLinks
  /** URL of the JSON listing the products shown in the dedicated column. */
  productsJsonUrl?: string
  /** Heading of the products column. */
  productsTitle?: string
  /** Called when the products JSON cannot be fetched or validated. */
  onProductsJsonFetchError?: (reason: unknown) => void
  /** Hides the products column entirely. */
  hideProductsColumn?: boolean
  className?: string
}

/** Port of mui-italia `FooterPreLogin` (logo + about, products, resources, follow). */
function FooterPreLogin({
  companyLink,
  links,
  productsJsonUrl = PRODUCTS_JSON_URL,
  productsTitle = "Prodotti e Servizi",
  onProductsJsonFetchError,
  hideProductsColumn = false,
  languages,
  onLanguageChanged,
  currentLangCode,
  className,
}: FooterPreLoginProps) {
  const [products, setProducts] = React.useState<FooterProduct[]>([])

  React.useEffect(() => {
    if (hideProductsColumn) return
    let cancelled = false

    fetch(productsJsonUrl)
      .then((response) => response.json())
      .then((json) => {
        const result = productsSchema.safeParse(json)
        if (!result.success) {
          throw result.error
        }
        if (!cancelled) setProducts(result.data)
      })
      .catch((reason: unknown) => {
        if (onProductsJsonFetchError) {
          onProductsJsonFetchError(reason)
        } else {
          console.error(reason)
        }
      })

    return () => {
      cancelled = true
    }
  }, [hideProductsColumn, productsJsonUrl, onProductsJsonFetchError])

  return (
    <footer className={cn("border-t border-border bg-card", className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4">
        <div className="flex flex-col gap-6">
          <a
            href={companyLink.href ?? "#"}
            aria-label={companyLink.ariaLabel}
            onClick={companyLink.onClick}
            className="inline-flex"
          >
            <LogoPagoPACompany />
          </a>

          <nav
            aria-label={links.aboutUs.title ?? "Chi siamo"}
            className="flex flex-col gap-3"
          >
            {links.aboutUs.title ? (
              <h2 className="text-overline text-foreground">
                {links.aboutUs.title}
              </h2>
            ) : null}
            {links.aboutUs.links.map((item, index) => (
              <FooterLink key={index} item={item} />
            ))}
          </nav>
        </div>

        {!hideProductsColumn ? (
          <nav aria-label={productsTitle} className="flex flex-col gap-3">
            <h2 className="text-overline text-foreground">{productsTitle}</h2>
            <ul className="flex flex-col gap-2">
              {products.map((product, index) => (
                <li key={index}>
                  <a
                    href={product.href}
                    lang="it"
                    aria-label={product.ariaLabel}
                    className="text-caption font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {product.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <nav
          aria-label={links.resources.title ?? "Risorse"}
          className="flex flex-col gap-3"
        >
          {links.resources.title ? (
            <h2 className="text-overline text-foreground">
              {links.resources.title}
            </h2>
          ) : null}
          {links.resources.links.map((item, index) => (
            <FooterLink key={index} item={item} />
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <h2 className="text-overline text-foreground">
            {links.followUs.title}
          </h2>
          <ul className="flex flex-wrap items-center gap-4 sm:gap-2 lg:gap-4">
            {links.followUs.socialLinks
              .filter((social) => social.icon in socialIcons)
              .map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href ?? "#"}
                    aria-label={social.ariaLabel ?? social.title}
                    onClick={social.onClick}
                    className="inline-flex rounded-sm text-foreground outline-none hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&_svg]:size-6"
                  >
                    {socialIcons[social.icon]}
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
          <div className="mt-2">
            <FundedByNextGenerationEU size={180} />
          </div>
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
  productsJsonUrl?: string
  productsTitle?: string
  onProductsJsonFetchError?: (reason: unknown) => void
  hideProductsColumn?: boolean
  onExit?: (exitAction: () => void) => void
}

/** Port of mui-italia `Footer`: pre-login or post-login + legal info. */
function Footer({
  loggedUser,
  companyLink,
  postLoginLinks,
  preLoginLinks,
  legalInfo,
  productsJsonUrl,
  productsTitle,
  onProductsJsonFetchError,
  hideProductsColumn,
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
          productsJsonUrl={productsJsonUrl}
          productsTitle={productsTitle}
          onProductsJsonFetchError={onProductsJsonFetchError}
          hideProductsColumn={hideProductsColumn}
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
