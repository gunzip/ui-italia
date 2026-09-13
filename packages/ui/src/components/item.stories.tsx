import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRightIcon, Trash2Icon, UserIcon } from "lucide-react"

import { Button } from "./button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./item"

const meta = {
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item role="listitem">
        <ItemMedia variant="icon">
          <UserIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Mario Rossi</ItemTitle>
          <ItemDescription>mario.rossi@example.it</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete Mario Rossi"
          >
            <Trash2Icon />
          </Button>
        </ItemActions>
      </Item>
      <Item role="listitem">
        <ItemMedia variant="icon">
          <UserIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Giulia Bianchi</ItemTitle>
          <ItemDescription>giulia.bianchi@example.it</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete Giulia Bianchi"
          >
            <Trash2Icon />
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item role="listitem" variant="outline">
        <ItemContent>
          <ItemTitle>Registry service</ItemTitle>
          <ItemDescription>
            Certificates, change of residence and family status.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item role="listitem" variant="outline">
        <ItemContent>
          <ItemTitle>Tax service</ItemTitle>
          <ItemDescription>
            IMU, TARI and viewing of payments made.
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}

export const Clickable: Story = {
  render: () => (
    <Item render={<a href="#" />} className="w-96">
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Open profile</ItemTitle>
        <ItemDescription>View and update your data.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </ItemActions>
    </Item>
  ),
}
