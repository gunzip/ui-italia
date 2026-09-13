import type { Meta, StoryObj } from "@storybook/react-vite"

import { PartyAvatar } from "./party-avatar"

const logo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%230066CC'/%3E%3C/svg%3E"

const meta = {
  title: "Blocks/PartyAvatar",
  component: PartyAvatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PartyAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithLogo: Story = {
  args: { customSrc: logo, customAlt: "Ente", size: 48 },
}

export const Fallback: Story = {
  args: { customAlt: "Ente", size: 48 },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <PartyAvatar customSrc={logo} customAlt="Ente" size={32} />
      <PartyAvatar customSrc={logo} customAlt="Ente" size={48} />
      <PartyAvatar customSrc={logo} customAlt="Ente" size={64} />
    </div>
  ),
}
