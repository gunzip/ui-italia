import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Label } from "./label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select"

const meta = {
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="native-select-regione">Region</Label>
      <NativeSelect
        id="native-select-regione"
        defaultValue="lazio"
        className="w-full"
      >
        <NativeSelectOption value="lazio">Lazio</NativeSelectOption>
        <NativeSelectOption value="lombardia">Lombardia</NativeSelectOption>
        <NativeSelectOption value="campania">Campania</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Region" })
    await userEvent.selectOptions(select, "lombardia")
    await expect(select).toHaveValue("lombardia")
  },
}

export const WithOptGroup: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="native-select-area">Geographic area</Label>
      <NativeSelect
        id="native-select-area"
        defaultValue="lazio"
        className="w-full"
      >
        <NativeSelectOptGroup label="North">
          <NativeSelectOption value="lombardia">Lombardia</NativeSelectOption>
          <NativeSelectOption value="veneto">Veneto</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Center">
          <NativeSelectOption value="lazio">Lazio</NativeSelectOption>
          <NativeSelectOption value="toscana">Toscana</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="native-select-small">Region</Label>
      <NativeSelect
        id="native-select-small"
        size="sm"
        defaultValue="lazio"
        className="w-full"
      >
        <NativeSelectOption value="lazio">Lazio</NativeSelectOption>
        <NativeSelectOption value="lombardia">Lombardia</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="native-select-invalid">Region</Label>
      <NativeSelect
        id="native-select-invalid"
        aria-invalid
        aria-describedby="native-select-invalid-error"
        defaultValue=""
        className="w-full"
      >
        <NativeSelectOption value="" disabled>
          Select a region
        </NativeSelectOption>
        <NativeSelectOption value="lazio">Lazio</NativeSelectOption>
        <NativeSelectOption value="lombardia">Lombardia</NativeSelectOption>
      </NativeSelect>
      <p id="native-select-invalid-error" className="text-sm text-destructive">
        Select a region to continue.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="native-select-disabled">Region</Label>
      <NativeSelect
        id="native-select-disabled"
        disabled
        defaultValue="lazio"
        className="w-full"
      >
        <NativeSelectOption value="lazio">Lazio</NativeSelectOption>
        <NativeSelectOption value="lombardia">Lombardia</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}
