import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "./checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field"
import { Input } from "./input"

const meta = {
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-nome">Nome completo</FieldLabel>
        <Input id="field-nome" placeholder="Mario Rossi" />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="nome@esempio.it" />
      </Field>
    </FieldGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-username">Nome utente</FieldLabel>
      <Input id="field-username" placeholder="mario.rossi" />
      <FieldDescription>
        Il nome utente sarà visibile pubblicamente sul tuo profilo.
      </FieldDescription>
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="field-codice">Codice fiscale</FieldLabel>
      <Input
        id="field-codice"
        aria-invalid
        aria-describedby="field-codice-error"
        defaultValue="ABC123"
      />
      <FieldError id="field-codice-error">
        Il codice fiscale inserito non è valido.
      </FieldError>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="field-newsletter" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="field-newsletter">Newsletter</FieldLabel>
        <FieldDescription>
          Ricevi un riepilogo mensile delle novità.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const WithFieldSet: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Preferenze di contatto</FieldLegend>
      <FieldDescription>
        Scegli i canali con cui desideri essere contattato.
      </FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="field-canale-email" defaultChecked />
          <FieldLabel htmlFor="field-canale-email">Email</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-canale-sms" />
          <FieldLabel htmlFor="field-canale-sms">SMS</FieldLabel>
        </Field>
      </FieldGroup>
      <FieldSeparator>oppure</FieldSeparator>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-telefono">Telefono</FieldLabel>
          <Input
            id="field-telefono"
            type="tel"
            placeholder="+39 000 000 0000"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field className="max-w-sm" data-disabled="true">
      <FieldLabel htmlFor="field-disabled">Partita IVA</FieldLabel>
      <Input id="field-disabled" defaultValue="01234567890" disabled />
      <FieldDescription>
        Il campo è bloccato finché la verifica non è completata.
      </FieldDescription>
    </Field>
  ),
}
