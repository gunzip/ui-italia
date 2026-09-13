import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "./button"
import { Toaster } from "./sonner"

const meta = {
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Toaster />
      <Button onClick={() => toast("Modifiche salvate con successo")}>
        Mostra notifica
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "Mostra notifica" })
    )
    // Sonner mounts toasts with `opacity: 0` and only flips them visible on
    // the next paint, so poll until the animation marks them as mounted.
    await waitFor(() =>
      expect(screen.getByText("Modifiche salvate con successo")).toBeVisible()
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Toaster />
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => toast.success("Operazione completata")}
        >
          Successo
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Nuovo aggiornamento disponibile")}
        >
          Informazione
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Attenzione ai dati inseriti")}
        >
          Avviso
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Si è verificato un errore")}
        >
          Errore
        </Button>
      </div>
    </div>
  ),
}
