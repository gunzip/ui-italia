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
    trigger: "Spedizioni e consegne",
    content: "Gli ordini vengono affidati al corriere entro 24 ore lavorative.",
  },
  {
    value: "pagamenti",
    trigger: "Metodi di pagamento",
    content:
      "Sono accettate carte di credito, bonifico e pagamento alla consegna.",
  },
  {
    value: "resi",
    trigger: "Resi e rimborsi",
    content: "Puoi richiedere il reso entro 30 giorni dalla consegna.",
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
    const trigger = canvas.getByRole("button", { name: "Metodi di pagamento" })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(await canvas.findByText(/carte di credito/i)).toBeVisible()
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
