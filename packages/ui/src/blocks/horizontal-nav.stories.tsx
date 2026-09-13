import type { Meta, StoryObj } from "@storybook/react-vite"
import { BuildingIcon, FileTextIcon, ShieldCheckIcon } from "lucide-react"

import { HorizontalNav } from "./horizontal-nav"

const meta = {
  title: "Blocks/HorizontalNav",
  component: HorizontalNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HorizontalNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sections: [
      {
        icon: <FileTextIcon />,
        title: "Documenti",
        subtitle: "Consulta e scarica i documenti.",
        cta: { label: "Vai ai documenti", href: "#documenti" },
      },
      {
        icon: <BuildingIcon />,
        title: "Enti",
        subtitle: "Gestisci gli enti associati.",
        cta: { label: "Vai agli enti", href: "#enti" },
      },
      {
        icon: <ShieldCheckIcon />,
        title: "Sicurezza",
        subtitle: "Imposta le preferenze di sicurezza.",
        cta: { label: "Vai alla sicurezza", href: "#sicurezza" },
      },
    ],
  },
}
