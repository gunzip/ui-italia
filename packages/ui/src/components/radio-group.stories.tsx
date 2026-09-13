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
      aria-label="Shipping type"
      className="w-72"
    >
      <Label>
        <RadioGroupItem value="standard" />
        Standard (3-5 days)
      </Label>
      <Label>
        <RadioGroupItem value="express" />
        Express (24 hours)
      </Label>
      <Label>
        <RadioGroupItem value="pickup" />
        Pickup in store
      </Label>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const express = canvas.getByRole("radio", { name: "Express (24 hours)" })
    await userEvent.click(express)
    await expect(express).toBeChecked()
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      defaultValue="standard"
      aria-label="Shipping type"
      className="w-72"
    >
      <Label>
        <RadioGroupItem value="standard" />
        Standard (3-5 days)
      </Label>
      <Label>
        <RadioGroupItem value="express" disabled />
        Express (24 hours)
      </Label>
    </RadioGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <RadioGroup
        aria-label="Shipping type"
        aria-invalid
        aria-describedby="radio-group-error"
        className="w-72"
      >
        <Label>
          <RadioGroupItem value="standard" />
          Standard (3-5 days)
        </Label>
        <Label>
          <RadioGroupItem value="express" />
          Express (24 hours)
        </Label>
      </RadioGroup>
      <p id="radio-group-error" className="text-sm text-destructive">
        Select a shipping type.
      </p>
    </div>
  ),
}
