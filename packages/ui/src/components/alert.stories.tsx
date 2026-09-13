import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

const meta = {
  component: Alert,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
    appearance: {
      control: "select",
      options: ["outlined", "standard", "filled"],
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
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the service is available.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        The session expires after 15 minutes of inactivity.
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
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>The changes could not be saved.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  args: {
    variant: "success",
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <CheckCircle2Icon aria-hidden="true" />
      <AlertTitle>Operation completed</AlertTitle>
      <AlertDescription>The changes have been saved.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  args: {
    variant: "warning",
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <TriangleAlertIcon aria-hidden="true" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>The session is about to expire.</AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  args: {
    variant: "info",
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <InfoIcon aria-hidden="true" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>See the service guidelines.</AlertDescription>
    </Alert>
  ),
}

/** `standard` appearance: status-tinted surface with a dark icon (`MuiAlert.standard`). */
export const Standard: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      {(
        [
          ["default", "Nota"],
          ["destructive", "Errore"],
          ["success", "Operazione completata"],
          ["warning", "Attenzione"],
          ["info", "Informazione"],
        ] as const
      ).map(([variant, title]) => (
        <Alert key={variant} variant={variant} appearance="standard">
          <InfoIcon aria-hidden="true" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>Contenuto dell&apos;avviso.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

/** `filled` appearance: status-tinted surface with a full status border (`MIAlert` default). */
export const Filled: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      {(
        [
          ["default", "Nota"],
          ["destructive", "Errore"],
          ["success", "Operazione completata"],
          ["warning", "Attenzione"],
          ["info", "Informazione"],
        ] as const
      ).map(([variant, title]) => (
        <Alert key={variant} variant={variant} appearance="filled">
          <InfoIcon aria-hidden="true" className="size-6" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>Contenuto dell&apos;avviso.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Cookie</AlertTitle>
      <AlertDescription>
        This site uses technical cookies required for it to work.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-sm" aria-label="Close notification">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  ),
}
