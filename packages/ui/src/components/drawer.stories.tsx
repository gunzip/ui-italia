import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

const meta = {
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Apri drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Dettagli ordine</DrawerTitle>
          <DrawerDescription>Riepilogo dell'ordine n. 4821.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 text-sm text-muted-foreground">
          Spedito il 12 settembre con corriere espresso. Consegna prevista in 2
          giorni lavorativi.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Chiudi
          </DrawerClose>
          <Button>Traccia spedizione</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Apri drawer" }))
    // Portalled drawer animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const drawer = await body.findByRole("dialog", { name: "Dettagli ordine" })
    await waitFor(() => expect(drawer).toBeVisible())
  },
}

export const WithSwipeHandle: Story = {
  render: () => (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Apri drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtri</DrawerTitle>
          <DrawerDescription>
            Affina i risultati della ricerca.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 text-sm text-muted-foreground">
          Seleziona categoria, prezzo e disponibilità.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Annulla
          </DrawerClose>
          <Button>Applica filtri</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromTop: Story = {
  render: () => (
    <Drawer swipeDirection="up" showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Apri dall'alto
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifiche</DrawerTitle>
          <DrawerDescription>
            Le ultime attività del tuo account.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 text-sm text-muted-foreground">
          Nessuna nuova notifica.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Chiudi
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const NonModal: Story = {
  render: () => (
    <Drawer modal={false}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Apri senza overlay
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pannello non modale</DrawerTitle>
          <DrawerDescription>
            Puoi interagire con il resto della pagina.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Chiudi
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
