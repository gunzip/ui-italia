import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProfileItem } from "./profile-item"

const meta = {
  title: "Blocks/ProfileItem",
  component: ProfileItem,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ProfileItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profileName: "Mario Rossi",
    profileInitials: "MR",
    onSwitchProfile: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const WithoutSwitch: Story = {
  args: {
    profileName: "Mario Rossi",
    profileInitials: "MR",
    showSwitchProfile: false,
    onSwitchProfile: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const Compact: Story = {
  args: {
    profileName: "Mario Rossi",
    profileInitials: "MR",
    onSwitchProfile: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-32">
        <Story />
      </div>
    ),
  ],
}
