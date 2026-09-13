import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import { BoxedModule, BoxedModuleTitle } from "./boxed-module"

const meta = {
  title: "Blocks/BoxedModule",
  component: BoxedModule,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BoxedModule>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BoxedModule className="max-w-2xl" icon={<FileTextIcon />}>
      <BoxedModuleTitle>Codice avviso</BoxedModuleTitle>
      <p className="text-caption">3020 1234 5678 9012 34</p>
    </BoxedModule>
  ),
}

export const WithAction: Story = {
  render: () => (
    <BoxedModule
      className="max-w-2xl"
      icon={<FileTextIcon />}
      action={<Button size="sm">Scarica</Button>}
    >
      <BoxedModuleTitle>Documento disponibile</BoxedModuleTitle>
      <p className="text-caption">Scaricabile fino al 30/09/2026.</p>
    </BoxedModule>
  ),
}

export const Vertical: Story = {
  render: () => (
    <BoxedModule
      className="max-w-md"
      direction="vertical"
      icon={<FileTextIcon />}
      action={<Button className="w-full">Attiva prodotto</Button>}
    >
      <BoxedModuleTitle>Check IBAN</BoxedModuleTitle>
      <p className="text-caption">
        Verifica l&apos;abbinamento di un IBAN ad un CF.
      </p>
    </BoxedModule>
  ),
}

export const Loading: Story = {
  render: () => (
    <BoxedModule
      className="max-w-2xl"
      loading
      loadingLabel="Caricamento modulo"
    />
  ),
}
