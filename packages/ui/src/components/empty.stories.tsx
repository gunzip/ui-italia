import type { Meta, StoryObj } from "@storybook/react-vite"
import { InboxIcon, SearchXIcon } from "lucide-react"

import { Button } from "./button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"

const meta = {
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>Nessun messaggio</EmptyTitle>
        <EmptyDescription>
          Non hai ancora ricevuto messaggi. Quando ne arriveranno, li troverai
          qui.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Crea messaggio</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithDefaultMedia: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia>
          <SearchXIcon aria-hidden="true" className="size-10" />
        </EmptyMedia>
        <EmptyTitle>Nessun risultato</EmptyTitle>
        <EmptyDescription>
          Prova a modificare i filtri di ricerca o a usare parole chiave
          diverse.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Azzera filtri
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyTitle>Nessun dato disponibile</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithMultipleActions: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>Cartella vuota</EmptyTitle>
        <EmptyDescription>
          Importa i tuoi documenti oppure iniziane uno da zero.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Importa
          </Button>
          <Button size="sm">Nuovo documento</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}
