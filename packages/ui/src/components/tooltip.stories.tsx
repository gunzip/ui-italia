import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2Icon } from "lucide-react"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta = {
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Salva
        </TooltipTrigger>
        <TooltipContent>Salva le modifiche</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByRole("button", { name: "Salva" }))
    // Portalled tooltip animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const tooltip = await body.findByText("Salva le modifiche")
    await waitFor(() => expect(tooltip).toBeVisible())
  },
}

export const IconTrigger: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Elimina" />
          }
        >
          <Trash2Icon aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent>Elimina definitivamente</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Sopra
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip in alto</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Sotto
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip in basso</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Destra
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip a destra</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
