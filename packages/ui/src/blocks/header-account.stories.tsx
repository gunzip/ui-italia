import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"

import { HeaderAccount } from "./header-account"

const meta = {
  title: "Blocks/HeaderAccount",
  component: HeaderAccount,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderAccount>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  rootLink: {
    label: "PagoPA S.p.A.",
    href: "#",
    ariaLabel: "Vai al sito di PagoPA",
    title: "PagoPA",
  },
  onAssistanceClick: () => {},
  onDocumentationClick: () => {},
}

export const LoggedOut: Story = {
  args: { ...base, loggedUser: false, onLogin: () => {} },
}

export const LoggedInLogout: Story = {
  args: {
    ...base,
    loggedUser: { id: "1", name: "Mario", surname: "Rossi" },
    onLogout: () => {},
  },
}

export const LoggedInDropdown: Story = {
  args: {
    ...base,
    loggedUser: { id: "1", name: "Mario", surname: "Rossi" },
    enableDropdown: true,
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
