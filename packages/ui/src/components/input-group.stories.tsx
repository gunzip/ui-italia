import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group"
import { Label } from "./label"

const meta = {
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-search">Cerca</Label>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id="input-group-search"
          placeholder="Cerca nel catalogo"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Invio</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-url">Indirizzo del sito</Label>
      <InputGroup>
        <InputGroupInput
          id="input-group-url"
          defaultValue="https://designers.italia.it"
          readOnly
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copia indirizzo">
            <CopyIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-message">Messaggio</Label>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Nota</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea
          id="input-group-message"
          placeholder="Scrivi un messaggio"
        />
      </InputGroup>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-email">Email</Label>
      <InputGroup>
        <InputGroupInput
          id="input-group-email"
          aria-invalid
          aria-describedby="input-group-email-error"
          placeholder="nome@esempio.it"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <p id="input-group-email-error" className="text-sm text-destructive">
        Inserisci un indirizzo email valido.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-disabled">Codice fiscale</Label>
      <InputGroup>
        <InputGroupInput
          id="input-group-disabled"
          disabled
          defaultValue="RSSMRA80A01H501U"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Verificato</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
