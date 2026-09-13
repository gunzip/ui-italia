import type { Meta, StoryObj } from "@storybook/react-vite"

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
  args: { ...base, loggedUser: false },
}

export const PostLogin: Story = {
  args: { ...base, loggedUser: true },
}
