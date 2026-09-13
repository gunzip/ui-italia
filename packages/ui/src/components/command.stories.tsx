import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { expect, screen, userEvent, within } from "storybook/test"

import { Button } from "./button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Apri command palette</Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Cerca un comando da eseguire."
      >
        <Command label="Cerca un comando">
          <CommandInput placeholder="Cerca un comando..." />
          <CommandList label="Suggerimenti">
            <CommandEmpty>Nessun risultato.</CommandEmpty>
            <CommandGroup heading="Azioni">
              <CommandItem>Nuovo documento</CommandItem>
              <CommandItem>Esporta come PDF</CommandItem>
              <CommandItem>Condividi</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

const meta = {
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    a11y: {
      // Upstream cmdk keeps `aria-activedescendant` on the input/list pointing
      // at the previously highlighted item; once filtering removes that item
      // from the listbox the reference is stale. cmdk's responsibility, not
      // something the story markup can fix.
      config: {
        rules: [{ id: "aria-valid-attr-value", enabled: false }],
      },
    },
  },
  render: () => (
    <Command
      label="Cerca un comando"
      className="w-80 border border-border shadow-md"
    >
      <CommandInput placeholder="Cerca un comando..." />
      <CommandList label="Suggerimenti">
        <CommandEmpty>Nessun risultato.</CommandEmpty>
        <CommandGroup heading="Suggerimenti">
          <CommandItem>Calendario</CommandItem>
          <CommandItem>Emoji</CommandItem>
          <CommandItem>Calcolatrice</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Impostazioni">
          <CommandItem>
            Profilo
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Impostazioni
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox", { name: "Cerca un comando" })
    await userEvent.type(input, "emoji")
    await expect(await canvas.findByText("Emoji")).toBeVisible()
    await expect(canvas.queryByText("Calcolatrice")).not.toBeInTheDocument()
  },
}

export const CommandDialogStory: Story = {
  name: "CommandDialog",
  render: () => <CommandDialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "Apri command palette" })
    )
    const dialog = await screen.findByRole("dialog")
    await expect(within(dialog).getByText("Nuovo documento")).toBeVisible()
  },
}

export const Empty: Story = {
  parameters: {
    a11y: {
      // With an empty result set cmdk still renders `role="listbox"` on the
      // list but no `option`/`group` children (the empty state is a plain
      // div). Upstream cmdk behavior.
      config: {
        rules: [{ id: "aria-required-children", enabled: false }],
      },
    },
  },
  render: () => (
    <Command
      label="Cerca un comando"
      className="w-80 border border-border shadow-md"
    >
      <CommandInput placeholder="Cerca un comando..." />
      <CommandList label="Suggerimenti">
        <CommandEmpty>Nessun risultato.</CommandEmpty>
      </CommandList>
    </Command>
  ),
}
