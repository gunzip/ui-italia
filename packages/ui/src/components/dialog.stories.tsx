import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, within } from "storybook/test"

import { Button } from "./button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Input } from "./input"
import { Label } from "./label"

const meta = {
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Apri dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confermi l'operazione?</DialogTitle>
          <DialogDescription>
            Questa azione non può essere annullata.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Annulla
          </DialogClose>
          <Button>Conferma</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Apri dialog" }))
    const dialog = await screen.findByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(
      within(dialog).getByText("Confermi l'operazione?")
    ).toBeVisible()
  },
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Apri dialog
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Sessione scaduta</DialogTitle>
          <DialogDescription>
            Accedi di nuovo per continuare a usare il servizio.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Accedi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Modifica profilo</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica profilo</DialogTitle>
          <DialogDescription>Aggiorna i tuoi dati personali.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dialog-name">Nome</Label>
          <Input id="dialog-name" defaultValue="Mario" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Annulla
          </DialogClose>
          <Button>Salva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
