import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyToClipboardButton } from "./copy-to-clipboard-button"

const meta = {
  title: "Blocks/CopyToClipboardButton",
  component: CopyToClipboardButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CopyToClipboardButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: "IT60X0542811101000000123456" },
}

export const FromFunction: Story = {
  args: {
    value: () => `IBAN-${Date.now()}`,
    copyLabel: "Copia codice",
    copiedLabel: "Codice copiato",
  },
}

export const WithLabel: Story = {
  args: { value: "302012345678901234" },
  render: () => (
    <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-elevation-4">
      <span className="font-mono text-body">3020 1234 5678 9012 34</span>
      <CopyToClipboardButton value="302012345678901234" />
    </div>
  ),
}
