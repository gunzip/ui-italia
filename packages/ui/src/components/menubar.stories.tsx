import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, within } from "storybook/test"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar"

const meta = {
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar aria-label="Menu principale">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Nuovo
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Apri
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Esci</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Modifica</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Annulla
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Ripeti
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }))
    await expect(await screen.findByText("Nuovo")).toBeVisible()
  },
}

export const WithCheckboxAndRadio: Story = {
  render: () => (
    <Menubar aria-label="Menu principale">
      <MenubarMenu>
        <MenubarTrigger>Visualizza</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Pannelli</MenubarLabel>
          <MenubarCheckboxItem defaultChecked>
            Barra laterale
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Console</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Tema</MenubarLabel>
          <MenubarRadioGroup defaultValue="system">
            <MenubarRadioItem value="light">Chiaro</MenubarRadioItem>
            <MenubarRadioItem value="dark">Scuro</MenubarRadioItem>
            <MenubarRadioItem value="system">Sistema</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <Menubar aria-label="Menu principale">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Salva</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Esporta</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF</MenubarItem>
              <MenubarItem>CSV</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
