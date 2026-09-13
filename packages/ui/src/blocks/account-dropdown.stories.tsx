import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"

import { AccountDropdown } from "./account-dropdown"

const meta = {
  title: "Blocks/AccountDropdown",
  component: AccountDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AccountDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: { id: "1", name: "Mario", surname: "Rossi", email: "m@example.com" },
    userActions: [
      {
        id: "profile",
        label: "Profilo",
        icon: <UserIcon />,
        onClick: () => {},
      },
      {
        id: "settings",
        label: "Impostazioni",
        icon: <SettingsIcon />,
        onClick: () => {},
      },
      { id: "exit", label: "Esci", icon: <LogOutIcon />, onClick: () => {} },
    ],
  },
}

export const WithoutActions: Story = {
  args: { user: { id: "1", name: "Mario", surname: "Rossi" } },
}
