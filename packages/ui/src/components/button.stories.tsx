import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { ArrowLeftIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"

import { Button } from "./button"

const meta = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "destructive-outline",
        "contrasted",
        "contrasted-outline",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "default",
        "lg",
        "icon-xs",
        "icon-sm",
        "icon",
        "icon-lg",
      ],
    },
    loadingType: {
      control: "radio",
      options: ["spinner", "skeleton"],
      if: { arg: "loading", eq: true },
    },
    loadingLabel: {
      control: "text",
      if: { arg: "loading", eq: true },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

export const DestructiveOutline: Story = {
  args: {
    variant: "destructive-outline",
    children: "Destructive outline",
  },
}

/** Use on dark/primary surfaces (MIButton `contrasted`). */
const ContrastedGroup = () => (
  <div className="flex items-center gap-4 rounded-lg bg-foreground p-6">
    <Button variant="contrasted">Contrasted</Button>
    <Button variant="contrasted-outline">Contrasted outline</Button>
  </div>
)

export const Contrasted: Story = {
  render: () => <ContrastedGroup />,
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
}

export const LoadingSpinner: Story = {
  args: {
    loading: true,
    loadingLabel: "Saving",
    children: "Save",
  },
}

export const LoadingSkeleton: Story = {
  args: {
    loading: true,
    loadingType: "skeleton",
    loadingLabel: "Saving",
    children: "Save",
  },
}

/** Panels mirroring `MIButton`'s stories. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Contained</Button>
      <Button variant="outline">Outlined</Button>
      <Button variant="link">Text</Button>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="destructive">Error</Button>
      <div className="rounded-lg bg-foreground p-3">
        <Button variant="contrasted">Contrasted</Button>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Icons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <ArrowLeftIcon data-icon="inline-start" />
        Back
      </Button>
      <Button>
        Next
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="destructive">
        <Trash2Icon data-icon="inline-start" />
        Delete
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-90">
      <Button className="w-full">Full width</Button>
    </div>
  ),
}

/**
 * Guards against the design-system CSS not loading in Storybook: asserts a
 * concrete computed style (Italia primary #0B3EE3, no theme shortcut).
 */
export const CssCheck: Story = {
  args: {
    children: "Styling check",
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /styling check/i })
    await expect(getComputedStyle(button).backgroundColor).toBe(
      "rgb(11, 62, 227)"
    )
  },
}
