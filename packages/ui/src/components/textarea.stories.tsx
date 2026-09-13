import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "./label"
import { Textarea } from "./textarea"

const meta = {
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-default">Message</Label>
      <Textarea id="textarea-default" placeholder="Write a message…" />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-value">Notes</Label>
      <Textarea
        id="textarea-value"
        defaultValue="The case has been taken on."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-disabled">Notes</Label>
      <Textarea id="textarea-disabled" disabled defaultValue="Field locked." />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-invalid">Message</Label>
      <Textarea
        id="textarea-invalid"
        aria-invalid
        aria-describedby="textarea-invalid-error"
      />
      <p id="textarea-invalid-error" className="text-sm text-destructive">
        The message is required.
      </p>
    </div>
  ),
}
