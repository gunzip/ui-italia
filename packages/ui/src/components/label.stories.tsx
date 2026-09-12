import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"
import { Label } from "./label"

const meta = {
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="label-default">Nome utente</Label>
      <Input id="label-default" placeholder="mario.rossi" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="label-required">
        Email
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </Label>
      <Input id="label-required" type="email" required />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="label-disabled">Codice fiscale</Label>
      <Input id="label-disabled" disabled />
    </div>
  ),
}
