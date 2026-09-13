import type { Meta, StoryObj } from "@storybook/react-vite"

import { Hero } from "./hero"

const image =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFFFF' fill-opacity='0.2'/%3E%3C/svg%3E"

const meta = {
  title: "Blocks/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    type: "text",
    title: "Il tuo spazio digitale",
    subtitle:
      "Gestisci i servizi della Pubblica Amministrazione in un unico posto.",
    ctaPrimary: { label: "Inizia", onClick: () => {} },
    ctaSecondary: { label: "Scopri di più", href: "#" },
  },
}

export const WithImage: Story = {
  args: {
    type: "image",
    title: "Il tuo spazio digitale",
    subtitle: "Gestisci i servizi in un unico posto.",
    image,
    altText: "Illustrazione",
    ctaPrimary: { label: "Inizia", onClick: () => {} },
  },
}

export const Inverse: Story = {
  args: {
    type: "image",
    inverse: true,
    title: "Il tuo spazio digitale",
    subtitle: "Gestisci i servizi in un unico posto.",
    image,
    altText: "Illustrazione",
    ctaPrimary: { label: "Inizia", onClick: () => {} },
  },
}
