import type { Meta, StoryObj } from "@storybook/react-vite"
import { fireEvent, expect, screen, within } from "storybook/test"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu"

const meta = {
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
        Clicca con il tasto destro
      </ContextMenuTrigger>
      <ContextMenuContent aria-label="Azioni contestuali">
        <ContextMenuItem>Modifica</ContextMenuItem>
        <ContextMenuItem>Duplica</ContextMenuItem>
        <ContextMenuItem disabled>Sposta</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Elimina</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    fireEvent.contextMenu(canvas.getByText("Clicca con il tasto destro"))
    const menu = await screen.findByRole("menu", {
      name: "Azioni contestuali",
    })
    await expect(
      within(menu).getByRole("menuitem", { name: "Modifica" })
    ).toBeVisible()
  },
}

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
        Clicca con il tasto destro
      </ContextMenuTrigger>
      <ContextMenuContent aria-label="Azioni contestuali">
        <ContextMenuItem>Nuovo</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Apri con</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Editor di testo</ContextMenuItem>
            <ContextMenuItem>Anteprima</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithCheckboxAndRadio: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
        Clicca con il tasto destro
      </ContextMenuTrigger>
      <ContextMenuContent aria-label="Preferenze di visualizzazione">
        <ContextMenuLabel>Visualizzazione</ContextMenuLabel>
        <ContextMenuCheckboxItem defaultChecked>
          Mostra barra laterale
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Mostra righello</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Ordina per</ContextMenuLabel>
        <ContextMenuRadioGroup defaultValue="nome">
          <ContextMenuRadioItem value="nome">Nome</ContextMenuRadioItem>
          <ContextMenuRadioItem value="data">Data</ContextMenuRadioItem>
          <ContextMenuRadioItem value="dimensione">
            Dimensione
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
