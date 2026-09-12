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
      <Label htmlFor="textarea-default">Messaggio</Label>
      <Textarea id="textarea-default" placeholder="Scrivi un messaggio…" />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-value">Note</Label>
      <Textarea
        id="textarea-value"
        defaultValue="La pratica è stata presa in carico."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-disabled">Note</Label>
      <Textarea
        id="textarea-disabled"
        disabled
        defaultValue="Campo bloccato."
      />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="textarea-invalid">Messaggio</Label>
      <Textarea
        id="textarea-invalid"
        aria-invalid
        aria-describedby="textarea-invalid-error"
      />
      <p id="textarea-invalid-error" className="text-sm text-destructive">
        Il messaggio è obbligatorio.
      </p>
    </div>
  ),
}
