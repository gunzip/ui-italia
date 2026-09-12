import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta = {
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup
      defaultValue="standard"
      aria-label="Tipo di spedizione"
      className="w-72"
    >
      <Label>
        <RadioGroupItem value="standard" />
        Standard (3-5 giorni)
      </Label>
      <Label>
        <RadioGroupItem value="express" />
        Express (24 ore)
      </Label>
      <Label>
        <RadioGroupItem value="pickup" />
        Ritiro in sede
      </Label>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const express = canvas.getByRole("radio", { name: "Express (24 ore)" })
    await userEvent.click(express)
    await expect(express).toBeChecked()
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      defaultValue="standard"
      aria-label="Tipo di spedizione"
      className="w-72"
    >
      <Label>
        <RadioGroupItem value="standard" />
        Standard (3-5 giorni)
      </Label>
      <Label>
        <RadioGroupItem value="express" disabled />
        Express (24 ore)
      </Label>
    </RadioGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <RadioGroup
        aria-label="Tipo di spedizione"
        aria-invalid
        aria-describedby="radio-group-error"
        className="w-72"
      >
        <Label>
          <RadioGroupItem value="standard" />
          Standard (3-5 giorni)
        </Label>
        <Label>
          <RadioGroupItem value="express" />
          Express (24 ore)
        </Label>
      </RadioGroup>
      <p id="radio-group-error" className="text-sm text-destructive">
        Seleziona un tipo di spedizione.
      </p>
    </div>
  ),
}
