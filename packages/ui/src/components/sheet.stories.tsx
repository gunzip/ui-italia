import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta = {
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Apri pannello
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifica profilo</SheetTitle>
          <SheetDescription>Aggiorna i tuoi dati personali.</SheetDescription>
        </SheetHeader>
        <div className="px-4 text-sm text-muted-foreground">
          Le modifiche verranno salvate automaticamente come bozza.
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Annulla</SheetClose>
          <Button>Salva</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Apri pannello" }))
    // Portalled sheet animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const sheet = await body.findByRole("dialog", { name: "Modifica profilo" })
    await waitFor(() => expect(sheet).toBeVisible())
  },
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Apri da sinistra
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu di navigazione</SheetTitle>
          <SheetDescription>Passa rapidamente a una sezione.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Chiudi</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Apri dall'alto
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Avvisi di sistema</SheetTitle>
          <SheetDescription>
            Manutenzione programmata per domenica.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>
            Ho capito
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Apri senza pulsante di chiusura
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Conferma operazione</SheetTitle>
          <SheetDescription>
            Usa i pulsanti in basso per procedere.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Annulla</SheetClose>
          <SheetClose render={<Button />}>Conferma</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
