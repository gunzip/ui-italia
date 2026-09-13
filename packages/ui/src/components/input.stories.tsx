import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleCheckIcon, CircleAlertIcon, UserIcon } from "lucide-react"

import { Input } from "./input"
import { Label } from "./label"

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

function Field({
  label,
  htmlFor,
  helper,
  error,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  error?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {helper ? (
        <p
          id={`${htmlFor}-helper`}
          className={
            error
              ? "text-xs leading-[1.25] font-semibold tracking-[0.5px] text-destructive"
              : "text-xs leading-[1.25] font-semibold tracking-[0.5px] text-muted-foreground"
          }
        >
          {helper}
        </p>
      ) : null}
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <Field label="Codice Avviso" htmlFor="input-default">
      <Input id="input-default" placeholder="Inserisci il codice" />
    </Field>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <Field
      label="Codice Avviso"
      htmlFor="input-helper"
      helper="Inserisci 18 cifre"
    >
      <Input id="input-helper" placeholder="Inserisci il codice" />
    </Field>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Field label="Nome sulla carta" htmlFor="input-icon">
      <div className="relative">
        <UserIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input id="input-icon" className="pl-11" placeholder="Mario Rossi" />
      </div>
    </Field>
  ),
}

export const StateError: Story = {
  render: () => (
    <Field
      label="Ripeti di nuovo"
      htmlFor="input-error"
      helper="Gli indirizzi email devono coincidere"
      error
    >
      <div className="relative">
        <Input
          id="input-error"
          className="pr-11"
          aria-invalid
          aria-describedby="input-error-helper"
          placeholder="Ripeti l'indirizzo"
        />
        <CircleAlertIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-destructive"
        />
      </div>
    </Field>
  ),
}

export const StateSuccess: Story = {
  render: () => (
    <Field
      label="Indirizzo mail"
      htmlFor="input-success"
      helper="Indirizzo valido"
    >
      <div className="relative">
        <Input
          id="input-success"
          className="pr-11"
          aria-describedby="input-success-helper"
          defaultValue="mario.rossi@example.com"
        />
        <CircleCheckIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-success"
        />
      </div>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field label="Codice fiscale" htmlFor="input-disabled">
      <Input id="input-disabled" disabled defaultValue="RSSMRA80A01H501U" />
    </Field>
  ),
}
