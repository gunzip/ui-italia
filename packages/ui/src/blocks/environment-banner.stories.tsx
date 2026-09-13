import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon, TriangleAlertIcon } from "lucide-react"

import { EnvironmentBanner } from "./environment-banner"

const meta = {
  title: "Blocks/EnvironmentBanner",
  component: EnvironmentBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EnvironmentBanner>

export default meta
type Story = StoryObj<typeof meta>

export const White: Story = {
  args: {
    title: "Ambiente di collaudo",
    message: "Stai navigando in un ambiente di test.",
  },
}

export const Info: Story = {
  args: {
    bgColor: "info",
    icon: <InfoIcon className="size-6" />,
    title: "Ambiente di collaudo",
    message: "I dati inseriti non sono reali.",
    actionButton: { label: "Scopri di più", onClick: () => {} },
  },
}

export const Warning: Story = {
  args: {
    bgColor: "warning",
    icon: <TriangleAlertIcon className="size-6" />,
    title: "Attenzione",
    message: "Il servizio sarà in manutenzione dalle 22:00.",
    actionButton: { label: "Dettagli", onClick: () => {} },
  },
}

export const Closable: Story = {
  args: { ...White.args, onClose: () => {} },
}
