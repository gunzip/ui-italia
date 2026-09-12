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
      <Checkbox />
      Accetto i termini e le condizioni
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", {
      name: "Accetto i termini e le condizioni",
    })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const Checked: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />
      Accetto i termini e le condizioni
    </Label>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <Label>
      <Checkbox indeterminate />
      Seleziona tutte le voci
    </Label>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Label>
      <Checkbox disabled />
      Opzione non disponibile
    </Label>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label>
        <Checkbox aria-invalid aria-describedby="checkbox-error" />
        Accetto i termini e le condizioni
      </Label>
      <p id="checkbox-error" className="text-sm text-destructive">
        Devi accettare i termini per continuare.
      </p>
    </div>
  ),
}
