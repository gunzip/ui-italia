import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Label } from "./label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const fruits = [
  { label: "Apple", value: "mela" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "arancia" },
]

const meta = {
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="select-fruit">Fruit</Label>
      <Select items={fruits} defaultValue="mela">
        <SelectTrigger id="select-fruit" className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("combobox", { name: "Fruit" })
    await userEvent.click(trigger)
    // Portalled listbox animates in; wait for the enter animation first.
    const body = within(canvasElement.ownerDocument.body)
    const option = await body.findByRole("option", { name: "Banana" })
    await waitFor(() => expect(option).toBeVisible())
    await userEvent.click(option)
    await expect(trigger).toHaveTextContent("Banana")
  },
}

export const WithGroups: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="select-food">Food</Label>
      <Select defaultValue="mela">
        <SelectTrigger id="select-food" className="w-full">
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruit</SelectLabel>
            <SelectItem value="mela">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carota">Carrot</SelectItem>
            <SelectItem value="zucchina">Zucchini</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="select-disabled">Fruit</Label>
      <Select items={fruits} defaultValue="mela" disabled>
        <SelectTrigger id="select-disabled" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="select-invalid">Fruit</Label>
      <Select items={fruits}>
        <SelectTrigger
          id="select-invalid"
          className="w-full"
          aria-invalid
          aria-describedby="select-invalid-error"
        >
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p id="select-invalid-error" className="text-sm text-destructive">
        Select a fruit to continue.
      </p>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="select-small">Fruit</Label>
      <Select items={fruits} defaultValue="banana">
        <SelectTrigger id="select-small" size="sm" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}
