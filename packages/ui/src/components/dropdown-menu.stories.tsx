import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta = {
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Account actions">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon aria-hidden="true" />
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden="true" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }))
    // Base UI labels the popup via `aria-labelledby` pointing at the trigger,
    // so the menu's accessible name is the trigger label, not `aria-label`.
    // The menu is portalled and animates in; wait for the enter animation.
    const body = within(canvasElement.ownerDocument.body)
    const menu = await body.findByRole("menu")
    await waitFor(() =>
      expect(
        within(menu).getByRole("menuitem", { name: /Profile/ })
      ).toBeVisible()
    )
  },
}

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        New
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="New item">
        <DropdownMenuItem>Document</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Import from</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Local file</DropdownMenuItem>
            <DropdownMenuItem>URL</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithCheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Visible columns">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>
            Name
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem defaultChecked>
            Date
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithRadioItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Sort by
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Sort by">
        <DropdownMenuRadioGroup defaultValue="name">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="data">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Disabled: Story = {
  render: () => (
    <DropdownMenu disabled>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Disabled menu
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Unavailable actions">
        <DropdownMenuItem>Unavailable</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
