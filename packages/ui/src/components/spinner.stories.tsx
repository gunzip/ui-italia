import type { Meta, StoryObj } from "@storybook/react-vite"

import { Spinner } from "./spinner"

const meta = {
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner />,
}

export const Small: Story = {
  render: () => <Spinner className="size-3" />,
}

export const Large: Story = {
  render: () => <Spinner className="size-8" />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Spinner className="size-5" />
      <span>Loading…</span>
    </div>
  ),
}
