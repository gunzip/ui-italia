import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Label } from "./label"
import { Switch } from "./switch"

const meta = {
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Label>
      <Switch />
      Email notifications
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("switch", { name: "Email notifications" })
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
  },
}

export const Checked: Story = {
  render: () => (
    <Label>
      <Switch defaultChecked />
      Email notifications
    </Label>
  ),
}

export const Small: Story = {
  render: () => (
    <Label>
      <Switch size="sm" defaultChecked />
      Compact mode
    </Label>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Label>
      <Switch disabled />
      Email notifications
    </Label>
  ),
}
