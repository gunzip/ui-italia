import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Link } from "./link"

const meta = {
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    underline: {
      control: "select",
      options: ["always", "hover", "none"],
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "#",
    children: "Link di esempio",
  },
}

export const UnderlineHover: Story = {
  args: {
    href: "#",
    underline: "hover",
    children: "Sottolineato al passaggio",
  },
}

export const UnderlineNone: Story = {
  args: {
    href: "#",
    underline: "none",
    children: "Senza sottolineatura",
  },
}

/** Guards the MUI parity: primary colour, underline and 8px focus radius. */
export const CssCheck: Story = {
  args: {
    href: "#",
    children: "Styling check",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: /styling check/i })
    const style = getComputedStyle(link)

    await expect(style.color).toBe("rgb(11, 62, 227)")
    await expect(style.textDecorationLine).toBe("underline")
    await expect(style.borderRadius).toBe("8px")
  },
}
