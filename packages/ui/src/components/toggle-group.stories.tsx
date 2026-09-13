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
    <ToggleGroup aria-label="Allineamento" defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Allinea a sinistra">
        <AlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Allinea al centro">
        <AlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Allinea a destra">
        <AlignRightIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const center = canvas.getByRole("button", {
      name: "Allinea al centro",
    })
    await userEvent.click(center)
    await expect(center).toHaveAttribute("aria-pressed", "true")
    await expect(
      canvas.getByRole("button", { name: "Allinea a sinistra" })
    ).toHaveAttribute("aria-pressed", "false")
  },
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Formato testo">
      <ToggleGroupItem value="bold" aria-label="Grassetto">
        <BoldIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Corsivo">
        <ItalicIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Sottolineato">
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
      aria-label="Vista calendario"
    >
      <ToggleGroupItem value="day">Giorno</ToggleGroupItem>
      <ToggleGroupItem value="week">Settimana</ToggleGroupItem>
      <ToggleGroupItem value="month">Mese</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup
      orientation="vertical"
      defaultValue={["inbox"]}
      aria-label="Cartelle"
    >
      <ToggleGroupItem value="inbox">Posta in arrivo</ToggleGroupItem>
      <ToggleGroupItem value="sent">Inviati</ToggleGroupItem>
      <ToggleGroupItem value="trash">Cestino</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup disabled aria-label="Allineamento">
      <ToggleGroupItem value="left" aria-label="Allinea a sinistra">
        <AlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Allinea al centro">
        <AlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
