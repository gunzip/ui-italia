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
    <ButtonGroup aria-label="Text formatting">
      <Button variant="outline" size="icon-sm" aria-label="Bold">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Italic">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Underline">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Zoom">
      <Button variant="outline" size="icon-sm" aria-label="Zoom in">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Zoom out">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <ButtonGroup aria-label="Site address">
      <ButtonGroupText>https://</ButtonGroupText>
      <Button variant="outline">Open</Button>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup aria-label="Alignment">
      <Button variant="outline" size="icon-sm" aria-label="Align left">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="Align center">
        <AlignCenterIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon-sm" aria-label="Align right">
        <AlignRightIcon />
      </Button>
    </ButtonGroup>
  ),
}
