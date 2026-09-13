import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { expect, userEvent, waitFor, within } from "storybook/test"

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
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Search for a command to run."
      >
        <Command label="Search for a command">
          <CommandInput placeholder="Search for a command..." />
          <CommandList label="Suggestions">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>New document</CommandItem>
              <CommandItem>Export as PDF</CommandItem>
              <CommandItem>Share</CommandItem>
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
      label="Search for a command"
      className="w-80 border border-border shadow-md"
    >
      <CommandInput placeholder="Search for a command..." />
      <CommandList label="Suggestions">
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox", {
      name: "Search for a command",
    })
    await userEvent.type(input, "emoji")
    await expect(await canvas.findByText("Emoji")).toBeVisible()
    await expect(canvas.queryByText("Calculator")).not.toBeInTheDocument()
  },
}

export const CommandDialogStory: Story = {
  name: "CommandDialog",
  render: () => <CommandDialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "Open command palette" })
    )
    // Portalled dialog animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog")
    await waitFor(() =>
      expect(within(dialog).getByText("New document")).toBeVisible()
    )
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
      label="Search for a command"
      className="w-80 border border-border shadow-md"
    >
      <CommandInput placeholder="Search for a command..." />
      <CommandList label="Suggestions">
        <CommandEmpty>No results.</CommandEmpty>
      </CommandList>
    </Command>
  ),
}
