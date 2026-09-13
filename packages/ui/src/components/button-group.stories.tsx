import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  MinusIcon,
  PlusIcon,
  UnderlineIcon,
} from "lucide-react"

import { Button } from "./button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group"

const meta = {
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Formattazione del testo">
      <Button variant="outline" size="icon-sm" aria-label="Grassetto">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Corsivo">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Sottolineato">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Zoom">
      <Button variant="outline" size="icon-sm" aria-label="Aumenta zoom">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Riduci zoom">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <ButtonGroup aria-label="Indirizzo del sito">
      <ButtonGroupText>https://</ButtonGroupText>
      <Button variant="outline">Apri</Button>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup aria-label="Allineamento">
      <Button variant="outline" size="icon-sm" aria-label="Allinea a sinistra">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Allinea al centro">
        <AlignCenterIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon-sm" aria-label="Allinea a destra">
        <AlignRightIcon />
      </Button>
    </ButtonGroup>
  ),
}
