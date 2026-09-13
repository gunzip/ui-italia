import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

const meta = {
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger delay={0} render={<Button variant="link" />}>
        @mario
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-foreground">Mario Rossi</p>
          <p className="text-muted-foreground">
            Interface designer for public services.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByText("@mario"))
    // Portalled card animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const card = await body.findByText("Mario Rossi")
    await waitFor(() => expect(card).toBeVisible())
  },
}

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HoverCard>
        <HoverCardTrigger delay={0} render={<Button variant="outline" />}>
          Top
        </HoverCardTrigger>
        <HoverCardContent side="top">
          Preview above the trigger.
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger delay={0} render={<Button variant="outline" />}>
          Bottom
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          Preview below the trigger.
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger delay={0} render={<Button variant="outline" />}>
          Right
        </HoverCardTrigger>
        <HoverCardContent side="right">
          Preview to the right of the trigger.
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

export const LinkTrigger: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        delay={0}
        render={<a href="#profile" />}
        className="text-primary underline underline-offset-4"
      >
        View full profile
      </HoverCardTrigger>
      <HoverCardContent>Last access on 12 September 2026.</HoverCardContent>
    </HoverCard>
  ),
}
