import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Badge } from "./badge"

const meta = {
  component: Badge,
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
        "outline-highlight",
        "outline-success",
        "outline-warning",
        "outline-info",
        "outline-destructive",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // MIChip ramp: filled error uses error[100], neutral uses MUI grey[300].
    const destructive = getComputedStyle(canvas.getByText("destructive"))
    await expect(destructive.backgroundColor).toBe("rgb(255, 217, 217)")
    await expect(destructive.color).toBe("rgb(93, 19, 19)")

    const neutral = getComputedStyle(canvas.getByText("neutral"))
    await expect(neutral.backgroundColor).toBe("rgb(224, 224, 224)")
    await expect(neutral.color).toBe("rgb(14, 15, 19)")
  },
}

/** Outlined variants, including the status colours (`MIChip` outlined). */
export const OutlineStatuses: Story = {
  render: () => (
    <div className="flex max-w-xl flex-wrap gap-2">
      {(
        [
          "outline",
          "outline-primary",
          "outline-highlight",
          "outline-success",
          "outline-warning",
          "outline-info",
          "outline-destructive",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.replace("outline-", "")}
        </Badge>
      ))}
    </div>
  ),
}

/** `MIChip` `avatar`: leading avatar/icon, regular weight. */
export const WithAvatar: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="primary"
        avatar={
          <img
            alt=""
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%230b3ee3'/%3E%3C/svg%3E"
          />
        }
      >
        Mario Rossi
      </Badge>
      <Badge variant="neutral">No avatar</Badge>
    </div>
  ),
}

/** `MIChip` `onDelete`: the delete button must be keyboard reachable and named. */
export const Deletable: Story = {
  args: {
    variant: "neutral",
    children: "Filtro attivo",
    deleteAriaLabel: "Rimuovi filtro",
    onDelete: () => {},
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const deleteButton = canvas.getByRole("button", { name: /rimuovi filtro/i })

    await step("the delete button is focusable", async () => {
      deleteButton.focus()
      await expect(deleteButton).toHaveFocus()
    })
  },
}
