import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

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
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "xs",
        "icon-xs",
        "default",
        "sm",
        "lg",
        "icon",
        "icon-sm",
        "icon-lg",
      ],
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

/**
 * Guards against the design-system CSS not loading in Storybook: asserts a
 * concrete computed style (Italy primary #0073E6, no theme shortcut).
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
