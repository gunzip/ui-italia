import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProductSwitch } from "./product-switch"

const meta = {
  title: "Blocks/ProductSwitch",
  component: ProductSwitch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentProductId: "pn",
    products: [
      { id: "pn", title: "Piattaforma Notifiche", productUrl: "#pn" },
      { id: "io", title: "App IO", productUrl: "#io" },
      { id: "interop", title: "Interoperabilità", productUrl: "#interop" },
    ],
    onExit: () => {},
  },
}
