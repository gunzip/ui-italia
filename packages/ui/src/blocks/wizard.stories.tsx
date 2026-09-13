import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, CreditCardIcon, UserIcon } from "lucide-react"

import { Wizard, WizardStep } from "./wizard"

const meta = {
  title: "Blocks/Wizard",
  component: Wizard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Wizard>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ withFeedback = false }: { withFeedback?: boolean }) {
  const [step, setStep] = React.useState(0)

  return (
    <Wizard
      activeStep={step}
      onStepChange={setStep}
      title="Attivazione prodotto"
      onExit={() => {}}
      feedback={
        withFeedback
          ? {
              title: "Richiesta completata",
              content: "Riceverai una email di conferma.",
              buttonText: "Chiudi",
              onClick: () => setStep(0),
            }
          : undefined
      }
    >
      <WizardStep label="Dati">
        <div className="flex items-center gap-3">
          <UserIcon aria-hidden="true" className="size-6 text-primary" />
          <p className="text-body">Inserisci i tuoi dati anagrafici.</p>
        </div>
      </WizardStep>
      <WizardStep label="Documenti">
        <div className="flex items-center gap-3">
          <FileTextIcon aria-hidden="true" className="size-6 text-primary" />
          <p className="text-body">Allega un documento valido.</p>
        </div>
      </WizardStep>
      <WizardStep label="Pagamento">
        <div className="flex items-center gap-3">
          <CreditCardIcon aria-hidden="true" className="size-6 text-primary" />
          <p className="text-body">Completa il pagamento.</p>
        </div>
      </WizardStep>
    </Wizard>
  )
}

export const Default: Story = {
  args: {
    activeStep: 0,
    onStepChange: () => {},
    title: "Attivazione prodotto",
    children: null,
  },
  render: () => <Demo />,
}

export const LastStep: Story = {
  args: {
    activeStep: 0,
    onStepChange: () => {},
    title: "Attivazione prodotto",
    children: null,
  },
  render: () => <Demo withFeedback />,
}
