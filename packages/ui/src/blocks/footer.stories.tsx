import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Footer } from "./footer"

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

const languages = { it: "Italiano", en: "English" }

/** Offline products payload: keeps the story (and the a11y gate) network-free. */
const productsJsonUrl = `data:application/json,${encodeURIComponent(
  JSON.stringify([
    {
      label: "Piattaforma Notifiche",
      href: "#pn",
      ariaLabel: "Piattaforma Notifiche",
      linkType: "internal",
    },
    {
      label: "App IO",
      href: "#io",
      ariaLabel: "App IO",
      linkType: "external",
    },
  ])
)}`

const base = {
  companyLink: { href: "#", ariaLabel: "PagoPA" },
  postLoginLinks: [
    { label: "Privacy", href: "#privacy" },
    { label: "Termini", href: "#termini" },
    { label: "Assistenza", href: "#assistenza" },
  ],
  preLoginLinks: {
    aboutUs: {
      title: "Chi siamo",
      links: [
        { label: "Informazioni", href: "#" },
        { label: "Lavora con noi", href: "#" },
      ],
    },
    resources: {
      title: "Risorse",
      links: [
        { label: "Documentazione", href: "#" },
        { label: "API", href: "#" },
      ],
    },
    followUs: {
      title: "Seguici su",
      socialLinks: [
        { icon: "linkedin" as const, title: "LinkedIn", href: "#" },
        { icon: "instagram" as const, title: "Instagram", href: "#" },
        { icon: "twitter" as const, title: "Twitter", href: "#" },
        { icon: "threads" as const, title: "Threads", href: "#" },
        { icon: "youtube" as const, title: "YouTube", href: "#" },
        { icon: "medium" as const, title: "Medium", href: "#" },
      ],
      links: [{ label: "Accessibilità", href: "#" }],
    },
  },
  legalInfo: "PagoPA S.p.A. — Sede legale in Roma.",
  languages,
  onLanguageChanged: () => {},
  currentLangCode: "it" as const,
}

export const PreLogin: Story = {
  args: { ...base, loggedUser: false, productsJsonUrl },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      await canvas.findByRole("heading", { name: "Prodotti e Servizi" })
    ).toBeInTheDocument()
    await expect(
      await canvas.findByRole("link", { name: "Piattaforma Notifiche" })
    ).toBeInTheDocument()
  },
}

export const PreLoginProductsHidden: Story = {
  args: { ...base, loggedUser: false, hideProductsColumn: true },
}

export const PostLogin: Story = {
  args: { ...base, loggedUser: true },
}
