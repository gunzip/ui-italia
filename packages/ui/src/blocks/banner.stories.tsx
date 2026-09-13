import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "./banner"

const meta = {
  title: "Blocks/Banner",
  component: Banner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: "Scopri i nuovi servizi",
    message: "Attiva i servizi digitali per la tua impresa.",
    badge: "Novità",
    cta: { label: "Scopri di più", onClick: () => {} },
    onClose: () => {},
  },
}

export const SecondaryInfo: Story = {
  args: {
    variant: "secondary",
    color: "info",
    title: "Completa il tuo profilo",
    message: "Aggiungi i dati mancanti per continuare.",
    cta: { label: "Completa", href: "#profilo" },
  },
}

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    title: "Suggerimento",
    message: "Puoi salvare le bozze e riprenderle in seguito.",
    cta: { label: "Dettagli", onClick: () => {} },
  },
}
