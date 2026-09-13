import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDownIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "./button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

const meta = {
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 rounded-lg border border-border">
      <CollapsibleTrigger
        render={<Button variant="ghost" className="w-full justify-between" />}
      >
        Order details
        <ChevronDownIcon aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
        Order no. 4821 — shipped on 12 September with express courier.
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Order details" }))
    await expect(await canvas.findByText(/Order no. 4821/)).toBeVisible()
  },
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80 rounded-lg border border-border">
      <CollapsibleTrigger
        render={<Button variant="ghost" className="w-full justify-between" />}
      >
        Order details
        <ChevronDownIcon aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
        Order no. 4821 — shipped on 12 September with express courier.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-80 rounded-lg border border-border">
      <CollapsibleTrigger
        render={<Button variant="ghost" className="w-full justify-between" />}
      >
        Order details
        <ChevronDownIcon aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
        Content unavailable.
      </CollapsibleContent>
    </Collapsible>
  ),
}
