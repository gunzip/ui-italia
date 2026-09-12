import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"
import { Label } from "./label"

const meta = {
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="input-default">Nome</Label>
      <Input id="input-default" placeholder="Mario" />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="input-value">Email</Label>
      <Input
        id="input-value"
        type="email"
        defaultValue="mario.rossi@example.com"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="input-disabled">Codice fiscale</Label>
      <Input id="input-disabled" disabled defaultValue="RSSMRA80A01H501U" />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="input-invalid">Email</Label>
      <Input
        id="input-invalid"
        type="email"
        aria-invalid
        aria-describedby="input-invalid-error"
        defaultValue="mario.rossi"
      />
      <p id="input-invalid-error" className="text-sm text-destructive">
        Inserisci un indirizzo email valido.
      </p>
    </div>
  ),
}
