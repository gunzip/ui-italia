import type { Meta, StoryObj } from "@storybook/react-vite"
import { BellIcon, FileTextIcon } from "lucide-react"

import { HeaderProduct } from "./header-product"

const meta = {
  title: "Blocks/HeaderProduct",
  component: HeaderProduct,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderProduct>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  chipLabel: "Demo",
  productId: "pn",
  productsList: [
    {
      id: "pn",
      title: "Piattaforma Notifiche",
      productUrl: "#pn",
      icon: <BellIcon />,
    },
    { id: "io", title: "App IO", productUrl: "#io", icon: <FileTextIcon /> },
  ],
  partyId: "roma",
  partyList: [
    { id: "roma", name: "Comune di Roma", productRole: "Referente" },
    { id: "milano", name: "Comune di Milano", productRole: "Operatore" },
  ],
  onSelectedProduct: () => {},
  onSelectedParty: () => {},
}

export const Default: Story = { args: base }

export const SingleProduct: Story = {
  args: { ...base, productsList: [base.productsList[0]] },
}

export const SingleParty: Story = {
  args: { ...base, partyList: [base.partyList[0]] },
}
