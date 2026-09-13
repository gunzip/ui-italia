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
            Progettista di interfacce per i servizi pubblici.
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
          Sopra
        </HoverCardTrigger>
        <HoverCardContent side="top">
          Anteprima sopra il trigger.
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger delay={0} render={<Button variant="outline" />}>
          Sotto
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          Anteprima sotto il trigger.
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger delay={0} render={<Button variant="outline" />}>
          Destra
        </HoverCardTrigger>
        <HoverCardContent side="right">
          Anteprima a destra del trigger.
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
        render={<a href="#profilo" />}
        className="text-primary underline underline-offset-4"
      >
        Vedi il profilo completo
      </HoverCardTrigger>
      <HoverCardContent>Ultimo accesso il 12 settembre 2026.</HoverCardContent>
    </HoverCard>
  ),
}
