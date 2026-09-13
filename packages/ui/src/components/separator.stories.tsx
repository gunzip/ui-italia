import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta = {
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Separator className="w-64" />,
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4 text-sm text-foreground">
      <span>Account</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
      <Separator orientation="vertical" />
      <span>Security</span>
    </div>
  ),
}
