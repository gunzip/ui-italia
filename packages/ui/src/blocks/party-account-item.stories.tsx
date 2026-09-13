import type { Meta, StoryObj } from "@storybook/react-vite"

import { PartyAccountItem } from "./party-account-item"

const meta = {
  title: "Blocks/PartyAccountItem",
  component: PartyAccountItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PartyAccountItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    partyName: "Comune di Roma",
    partyRole: "Referente amministrativo",
    parentPartyName: "Ente",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const LongName: Story = {
  args: {
    partyName:
      "Comune di un paese con un nome estremamente lungo che va troncato su più righe",
    partyRole: "Referente amministrativo",
    maxCharactersNumberMultiLine: 40,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}
