import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Label>
      <Checkbox />I accept the terms and conditions
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", {
      name: "I accept the terms and conditions",
    })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const Checked: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />I accept the terms and conditions
    </Label>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <Label>
      <Checkbox indeterminate />
      Select all items
    </Label>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Label>
      <Checkbox disabled />
      Option unavailable
    </Label>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label>
        <Checkbox aria-invalid aria-describedby="checkbox-error" />I accept the
        terms and conditions
      </Label>
      <p id="checkbox-error" className="text-sm text-destructive">
        You must accept the terms to continue.
      </p>
    </div>
  ),
}
