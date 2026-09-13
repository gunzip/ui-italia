import type { Meta, StoryObj } from "@storybook/react-vite"
import { CreditCardIcon, FileTextIcon, ShieldCheckIcon } from "lucide-react"

import { Walkthrough } from "./walkthrough"

const meta = {
  title: "Blocks/Walkthrough",
  component: Walkthrough,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Walkthrough>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Come iniziare",
    items: [
      {
        icon: <FileTextIcon />,
        title: "Inserisci i dati",
        subtitle: "Compila il modulo con i tuoi dati.",
      },
      {
        icon: <CreditCardIcon />,
        title: "Paga",
        subtitle: "Completa il pagamento in sicurezza.",
      },
      {
        icon: <ShieldCheckIcon />,
        title: "Conferma",
        subtitle: "Ricevi la conferma dell'attivazione.",
      },
    ],
  },
}
