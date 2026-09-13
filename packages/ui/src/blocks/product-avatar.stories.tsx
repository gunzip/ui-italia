import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProductAvatar } from "./product-avatar"

const logo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%230073E6'/%3E%3C/svg%3E"

const meta = {
  title: "Blocks/ProductAvatar",
  component: ProductAvatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { logoUrl: logo, logoAltText: "Prodotto" },
}

export const Sizes: Story = {
  args: { logoUrl: logo, logoAltText: "Prodotto" },
  render: () => (
    <div className="flex items-center gap-4">
      <ProductAvatar size="small" logoUrl={logo} logoAltText="Prodotto" />
      <ProductAvatar size="default" logoUrl={logo} logoAltText="Prodotto" />
      <ProductAvatar size="large" logoUrl={logo} logoAltText="Prodotto" />
    </div>
  ),
}

export const WithBackground: Story = {
  args: {
    logoUrl: logo,
    logoAltText: "Prodotto",
    logoBgColor: "var(--accent)",
  },
}
