import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

const meta = {
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <AlertTitle>Aggiornamento disponibile</AlertTitle>
      <AlertDescription>
        È disponibile una nuova versione del servizio.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Nota</AlertTitle>
      <AlertDescription>
        La sessione scade dopo 15 minuti di inattività.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <TriangleAlertIcon aria-hidden="true" />
      <AlertTitle>Errore</AlertTitle>
      <AlertDescription>
        Non è stato possibile salvare le modifiche.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Cookie</AlertTitle>
      <AlertDescription>
        Questo sito utilizza cookie tecnici necessari al funzionamento.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-sm" aria-label="Chiudi avviso">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  ),
}
