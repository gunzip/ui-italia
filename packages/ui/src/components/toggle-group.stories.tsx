import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta = {
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup aria-label="Alignment" defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const center = canvas.getByRole("button", {
      name: "Align center",
    })
    await userEvent.click(center)
    await expect(center).toHaveAttribute("aria-pressed", "true")
    await expect(
      canvas.getByRole("button", { name: "Align left" })
    ).toHaveAttribute("aria-pressed", "false")
  },
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup
      variant="outline"
      spacing={0}
      defaultValue={["day"]}
      aria-label="Calendar view"
    >
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup
      orientation="vertical"
      defaultValue={["inbox"]}
      aria-label="Folders"
    >
      <ToggleGroupItem value="inbox">Inbox</ToggleGroupItem>
      <ToggleGroupItem value="sent">Sent</ToggleGroupItem>
      <ToggleGroupItem value="trash">Trash</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup disabled aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
