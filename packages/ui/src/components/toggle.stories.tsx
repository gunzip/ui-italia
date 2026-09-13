import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoldIcon, ItalicIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Toggle } from "./toggle"

const meta = {
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Toggle>Show preview</Toggle>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Show preview" })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

export const Outline: Story = {
  render: () => <Toggle variant="outline">Preview</Toggle>,
}

export const Icon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon aria-hidden="true" />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon aria-hidden="true" />
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  render: () => <Toggle defaultPressed>Notifications enabled</Toggle>,
}

export const Disabled: Story = {
  render: () => <Toggle disabled>Unavailable</Toggle>,
}
