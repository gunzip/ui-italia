import type { Meta, StoryObj } from "@storybook/react-vite"

import { PartySwitch } from "./party-switch"

const meta = {
  title: "Blocks/PartySwitch",
  component: PartySwitch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PartySwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPartyId: "roma",
    parties: [
      { id: "roma", name: "Comune di Roma", productRole: "Referente" },
      { id: "milano", name: "Comune di Milano", productRole: "Operatore" },
      { id: "napoli", name: "Comune di Napoli", productRole: "Operatore" },
    ],
    onExit: () => {},
  },
}
