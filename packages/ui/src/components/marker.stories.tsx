import type { Meta, StoryObj } from "@storybook/react-vite"
import { ClockIcon, InfoIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "./marker"

const meta = {
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Marker className="w-80">
      <MarkerIcon>
        <ClockIcon />
      </MarkerIcon>
      <MarkerContent>Ultimo aggiornamento: 12 settembre 2026</MarkerContent>
    </Marker>
  ),
}

export const Separator: Story = {
  render: () => (
    <Marker variant="separator" className="w-80">
      <MarkerContent>oppure</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  render: () => (
    <Marker variant="border" className="w-80">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>
        I dati vengono sincronizzati ogni 15 minuti.
      </MarkerContent>
    </Marker>
  ),
}

export const WithLink: Story = {
  render: () => (
    <Marker
      render={<a href="#dettagli" />}
      className="w-80 underline underline-offset-3"
    >
      <MarkerContent>Vedi i dettagli dell'ordine</MarkerContent>
    </Marker>
  ),
}
