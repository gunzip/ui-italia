import type { Meta, StoryObj } from "@storybook/react-vite"
import { BellIcon, FileTextIcon, ShieldCheckIcon } from "lucide-react"

import { Showcase } from "./showcase"

const meta = {
  title: "Blocks/Showcase",
  component: Showcase,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Showcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Tutto ciò che ti serve",
    items: [
      {
        icon: <FileTextIcon />,
        title: "Documenti",
        subtitle: "Consulta i documenti in un unico posto.",
      },
      {
        icon: <BellIcon />,
        title: "Notifiche",
        subtitle: "Ricevi aggiornamenti in tempo reale.",
      },
      {
        icon: <ShieldCheckIcon />,
        title: "Sicurezza",
        subtitle: "I tuoi dati sono sempre protetti.",
      },
    ],
  },
}
