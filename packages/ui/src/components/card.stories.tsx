import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Accedi al servizio</CardTitle>
        <CardDescription>
          Usa SPID o CIE per accedere ai servizi della Pubblica Amministrazione.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Il contenuto principale della scheda.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Accedi</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Documenti</CardTitle>
        <CardDescription>3 file caricati.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Altre opzioni">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Gestisci i documenti allegati alla tua pratica.
        </p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Scheda compatta</CardTitle>
        <CardDescription>Versione con spaziatura ridotta.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Contenuto della scheda.</p>
      </CardContent>
    </Card>
  ),
}

const cover =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='160' viewBox='0 0 400 160'%3E%3Crect width='400' height='160' fill='%23e3f2fd'/%3E%3C/svg%3E"

export const WithImage: Story = {
  render: () => (
    <Card className="w-96">
      <img src={cover} alt="" className="h-32 w-full object-cover" />
      <CardHeader>
        <CardTitle>Immagine di copertina</CardTitle>
        <CardDescription>La prima immagine non ha padding.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Contenuto della scheda.</p>
      </CardContent>
    </Card>
  ),
}
