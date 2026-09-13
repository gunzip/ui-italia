import type { Meta, StoryObj } from "@storybook/react-vite"
import { TriangleAlertIcon } from "lucide-react"
import { expect, screen, userEvent, within } from "storybook/test"

import { Button } from "./button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"

const meta = {
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Elimina bozza
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminare la bozza?</AlertDialogTitle>
          <AlertDialogDescription>
            L'operazione non può essere annullata e la bozza verrà rimossa
            definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Elimina</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Elimina bozza" }))
    const dialog = await screen.findByRole("alertdialog")
    await expect(within(dialog).getByText("Eliminare la bozza?")).toBeVisible()
  },
}

export const WithMedia: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Esci dall'area personale
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TriangleAlertIcon aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Vuoi uscire?</AlertDialogTitle>
          <AlertDialogDescription>
            Dovrai effettuare di nuovo l'accesso per continuare.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Resta</AlertDialogCancel>
          <AlertDialogAction>Esci</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const Small: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Apri avviso
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Sessione in scadenza</AlertDialogTitle>
          <AlertDialogDescription>
            La sessione scadrà tra 5 minuti.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ignora</AlertDialogCancel>
          <AlertDialogAction>Continua</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const Closed: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Elimina account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminare l'account?</AlertDialogTitle>
          <AlertDialogDescription>
            Tutti i dati associati verranno cancellati.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Elimina</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
