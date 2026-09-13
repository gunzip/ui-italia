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
        <FieldLabel htmlFor="field-full-name">Full name</FieldLabel>
        <Input id="field-full-name" placeholder="Jane Doe" />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="name@example.com" />
      </Field>
    </FieldGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-username">Username</FieldLabel>
      <Input id="field-username" placeholder="mario.rossi" />
      <FieldDescription>
        The username will be publicly visible on your profile.
      </FieldDescription>
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="field-tax-code">Tax code</FieldLabel>
      <Input
        id="field-tax-code"
        aria-invalid
        aria-describedby="field-tax-code-error"
        defaultValue="ABC123"
      />
      <FieldError id="field-tax-code-error">
        The tax code entered is not valid.
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
          Receive a monthly summary of updates.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const WithFieldSet: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Contact preferences</FieldLegend>
      <FieldDescription>
        Choose the channels you want to be contacted through.
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
      <FieldSeparator>or</FieldSeparator>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-telefono">Phone</FieldLabel>
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
      <FieldLabel htmlFor="field-disabled">VAT number</FieldLabel>
      <Input id="field-disabled" defaultValue="01234567890" disabled />
      <FieldDescription>
        The field is locked until verification is complete.
      </FieldDescription>
    </Field>
  ),
}
