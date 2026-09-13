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
      <Label htmlFor="input-group-search">Search</Label>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id="input-group-search"
          placeholder="Search the catalog"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Enter</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-url">Site address</Label>
      <InputGroup>
        <InputGroupInput
          id="input-group-url"
          defaultValue="https://designers.italia.it"
          readOnly
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copy address">
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
      <Label htmlFor="input-group-message">Message</Label>
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupText>Note</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea
          id="input-group-message"
          placeholder="Write a message"
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
          placeholder="name@example.com"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <p id="input-group-email-error" className="text-sm text-destructive">
        Enter a valid email address.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="input-group-disabled">Tax code</Label>
      <InputGroup>
        <InputGroupInput
          id="input-group-disabled"
          disabled
          defaultValue="RSSMRA80A01H501U"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Verified</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
