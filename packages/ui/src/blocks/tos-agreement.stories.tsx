import type { Meta, StoryObj } from "@storybook/react-vite"

import { TOSAgreement } from "./tos-agreement"

const noop = () => {}

const meta = {
  title: "Blocks/TOSAgreement",
  component: TOSAgreement,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TOSAgreement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    productName: "Piattaforma Notifiche",
    description:
      "Per accedere devi accettare i Termini e le Condizioni d'uso del servizio.",
    onConfirm: noop,
  },
}

export const ConfirmDisabled: Story = {
  args: {
    ...Default.args,
    confirmButtonLabel: "Accedi",
    confirmButtonDisabled: true,
  },
}

export const WithContent: Story = {
  args: {
    ...Default.args,
    confirmButtonLabel: "Accetta e continua",
    children: (
      <div className="rounded-lg border border-border bg-card p-6 text-body text-muted-foreground">
        Contenuto dei termini di servizio.
      </div>
    ),
  },
}
