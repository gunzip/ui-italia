import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { expect, screen, userEvent, within } from "storybook/test"

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
        Apri menu
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Azioni account">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon aria-hidden="true" />
            Profilo
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden="true" />
            Impostazioni
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon aria-hidden="true" />
          Esci
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Apri menu" }))
    // Base UI labels the popup via `aria-labelledby` pointing at the trigger,
    // so the menu's accessible name is the trigger label, not `aria-label`.
    const menu = await screen.findByRole("menu")
    await expect(
      within(menu).getByRole("menuitem", { name: /Profilo/ })
    ).toBeVisible()
  },
}

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Nuovo
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Nuovo elemento">
        <DropdownMenuItem>Documento</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Importa da</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>File locale</DropdownMenuItem>
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
        Colonne
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Colonne visibili">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Colonne visibili</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>
            Nome
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem defaultChecked>
            Data
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Stato</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithRadioItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Ordina per
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Ordina per">
        <DropdownMenuRadioGroup defaultValue="nome">
          <DropdownMenuLabel>Ordina per</DropdownMenuLabel>
          <DropdownMenuRadioItem value="nome">Nome</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="data">Data</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dimensione">
            Dimensione
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Disabled: Story = {
  render: () => (
    <DropdownMenu disabled>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Menu disabilitato
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Azioni non disponibili">
        <DropdownMenuItem>Non disponibile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
