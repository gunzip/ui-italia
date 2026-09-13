import type { Meta, StoryObj } from "@storybook/react-vite"
import type * as React from "react"
import { expect, userEvent, within } from "storybook/test"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const faqs = [
  {
    value: "spedizioni",
    trigger: "Shipping and delivery",
    content: "Orders are handed to the courier within 24 working hours.",
  },
  {
    value: "pagamenti",
    trigger: "Payment methods",
    content: "Credit cards, bank transfers and cash on delivery are accepted.",
  },
  {
    value: "resi",
    trigger: "Returns and refunds",
    content: "You can request a return within 30 days of delivery.",
  },
]

function FaqAccordion(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion className="w-80" {...props}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.trigger}</AccordionTrigger>
          <AccordionContent>{faq.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const meta = {
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <FaqAccordion />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Payment methods" })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(await canvas.findByText(/credit cards/i)).toBeVisible()
  },
}

export const DefaultOpen: Story = {
  render: () => <FaqAccordion defaultValue={["spedizioni"]} />,
}

export const Multiple: Story = {
  render: () => (
    <FaqAccordion multiple defaultValue={["spedizioni", "pagamenti"]} />
  ),
}

export const Disabled: Story = {
  render: () => <FaqAccordion disabled defaultValue={["spedizioni"]} />,
}
