import type { Meta, StoryObj } from "@storybook/react-vite"
import { CommandIcon } from "lucide-react"

import { Kbd, KbdGroup } from "./kbd"

const meta = {
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>Esc</Kbd>,
}

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>
        <CommandIcon aria-hidden="true" />
      </Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Press{" "}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  ),
}

export const Sequences: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <KbdGroup>
        <Kbd>⇧</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Alt</Kbd>
        <Kbd>F4</Kbd>
      </KbdGroup>
    </div>
  ),
}
