import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stepper } from "./stepper"

const meta = {
  title: "Blocks/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { label: "Dati" },
  { label: "Documenti" },
  { label: "Pagamento" },
  { label: "Conferma" },
]

export const Desktop: Story = {
  args: { steps, activeStep: 1 },
  parameters: { viewport: { defaultViewport: "lg1200" } },
}

export const FirstStep: Story = {
  args: { steps, activeStep: 0 },
  parameters: { viewport: { defaultViewport: "lg1200" } },
}

export const Completed: Story = {
  args: { steps, activeStep: 3 },
  parameters: { viewport: { defaultViewport: "lg1200" } },
}

/** Below `lg` it switches to a circular progress with the active label. */
export const Mobile: Story = {
  args: { steps, activeStep: 2 },
  parameters: { viewport: { defaultViewport: "sm640" } },
}
