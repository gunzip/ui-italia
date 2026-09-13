import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarIcon, CreditCardIcon, FileTextIcon } from "lucide-react"

import { Tag, TagGroup } from "./tag"

const meta = {
  title: "Blocks/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: "In lavorazione" },
}

export const WithIcon: Story = {
  args: { value: "Scadenza", icon: <CalendarIcon /> },
}

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="info" value="Informativo" />
      <Tag variant="success" value="Confermato" />
      <Tag variant="warning" value="Attenzione" />
      <Tag variant="error" value="Errore" />
    </div>
  ),
}

export const Truncate: Story = {
  args: {
    value: "Un valore molto molto molto molto lungo che deve essere troncato",
    mode: "truncate",
  },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
}

export const Wrap: Story = {
  args: {
    value: "Un valore molto molto molto lungo che va a capo su più righe",
    mode: "wrap",
  },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
}

export const OnlyIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Tag variant="only-icon" aria-label="Documento" icon={<FileTextIcon />} />
      <Tag
        variant="only-icon"
        aria-label="Pagamento"
        icon={<CreditCardIcon />}
      />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <TagGroup visibleItems={3} className="max-w-md">
      <Tag value="Dati" />
      <Tag value="Documenti" />
      <Tag value="Pagamento" />
      <Tag value="Conferma" />
      <Tag value="Ricevuta" />
    </TagGroup>
  ),
}
