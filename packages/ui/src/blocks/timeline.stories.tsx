import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  PackageIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Timeline, TimelineItem } from "./timeline"

const meta = {
  title: "Blocks/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Timeline className="max-w-xl">
      <TimelineItem
        variant="success"
        icon={<CircleCheckIcon />}
        title="Spedizione accettata"
      >
        12/09/2026, 09:12
      </TimelineItem>
      <TimelineItem variant="info" icon={<PackageIcon />} title="In transito">
        Il pacco è partito dal centro di smistamento.
      </TimelineItem>
      <TimelineItem
        variant="warning"
        icon={<TriangleAlertIcon />}
        title="Tentativo di consegna"
      >
        Destinatario assente, nuovo tentativo previsto.
      </TimelineItem>
      <TimelineItem icon={<InfoIcon />} title="In giacenza">
        Disponibile per il ritiro.
      </TimelineItem>
    </Timeline>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <Timeline className="max-w-xl">
      <TimelineItem variant="normal" title="Normal">
        Stato neutro.
      </TimelineItem>
      <TimelineItem variant="info" title="Info">
        Informazione.
      </TimelineItem>
      <TimelineItem variant="success" title="Success">
        Completato.
      </TimelineItem>
      <TimelineItem variant="warning" title="Warning">
        Richiede attenzione.
      </TimelineItem>
      <TimelineItem variant="error" icon={<CircleXIcon />} title="Error">
        Operazione non riuscita.
      </TimelineItem>
    </Timeline>
  ),
}
