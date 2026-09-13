import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "./aspect-ratio"

const meta = {
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: ({ ratio }) => (
    <AspectRatio
      ratio={ratio}
      className="w-96 overflow-hidden rounded-lg bg-muted"
    >
      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
        16 / 9
      </div>
    </AspectRatio>
  ),
}

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: ({ ratio }) => (
    <AspectRatio
      ratio={ratio}
      className="w-64 overflow-hidden rounded-lg bg-muted"
    >
      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
        1 / 1
      </div>
    </AspectRatio>
  ),
}

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: ({ ratio }) => (
    <AspectRatio
      ratio={ratio}
      className="w-56 overflow-hidden rounded-lg bg-muted"
    >
      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
        3 / 4
      </div>
    </AspectRatio>
  ),
}
