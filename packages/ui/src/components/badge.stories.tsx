import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./badge"

const meta = {
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "highlight",
        "neutral",
        "destructive",
        "success",
        "warning",
        "info",
        "outline",
        "outline-primary",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Highlight: Story = {
  args: {
    variant: "highlight",
    children: "Highlight",
  },
}

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Neutral",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
}

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const OutlinePrimary: Story = {
  args: {
    variant: "outline-primary",
    children: "Outline primary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

/**
 * All the semantic colours in one row, like `MIChip`'s `FilledVariants`.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-wrap gap-2">
      {(
        [
          "primary",
          "secondary",
          "highlight",
          "neutral",
          "destructive",
          "success",
          "warning",
          "info",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}
