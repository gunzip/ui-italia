import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tag } from "./tag"
import { PartyAccountItemButton } from "./party-account-item-button"

const meta = {
  title: "Blocks/PartyAccountItemButton",
  component: PartyAccountItemButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PartyAccountItemButton>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  partyName: "Comune di Roma",
  partyRole: "Referente amministrativo",
  parentPartyName: "Ente",
  onAction: () => {},
}

export const Default: Story = {
  args: base,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Selected: Story = {
  args: { ...base, selectedItem: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const WithEndSlot: Story = {
  args: { ...base, endSlot: <Tag variant="success" value="Attivo" /> },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: { ...base, disabled: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}
