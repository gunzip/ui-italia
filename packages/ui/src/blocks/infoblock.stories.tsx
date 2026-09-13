import type { Meta, StoryObj } from "@storybook/react-vite"

import { Infoblock } from "./infoblock"

const image =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23E3F2FD'/%3E%3C/svg%3E"

const meta = {
  title: "Blocks/Infoblock",
  component: Infoblock,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Infoblock>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  overline: "Come funziona",
  title: "Attiva un prodotto in pochi passi",
  content:
    "Scegli il prodotto, completa i dati e conferma: ci pensiamo noi al resto.",
  image,
  altText: "Illustrazione",
  ctaPrimary: { label: "Inizia", onClick: () => {} },
  ctaSecondary: { label: "Scopri di più", href: "#" },
}

export const Default: Story = { args: base }

export const Inverse: Story = { args: { ...base, inverse: true } }

export const Portrait: Story = {
  args: { ...base, aspectRatio: "9/16" as const },
}

export const WithShadow: Story = {
  args: { ...base, imageShadow: true },
}
