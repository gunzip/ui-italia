import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  FundedByNextGenerationEU,
  LogoIOApp,
  LogoPagoPACompany,
  LogoPagoPAProduct,
  MonogramPagoPACompany,
} from "./index"

const meta = {
  title: "Assets/Logos",
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Cell({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-lg bg-card p-6 shadow-elevation-4">
      {children}
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  )
}

export const Logos: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
      <Cell name="LogoIOApp">
        <LogoIOApp />
      </Cell>
      <Cell name="LogoPagoPAProduct">
        <LogoPagoPAProduct />
      </Cell>
      <Cell name="LogoPagoPACompany">
        <LogoPagoPACompany />
      </Cell>
      <Cell name="LogoPagoPACompany flat">
        <LogoPagoPACompany variant="flat" />
      </Cell>
      <Cell name="MonogramPagoPACompany">
        <MonogramPagoPACompany />
      </Cell>
      <Cell name="MonogramPagoPACompany circle">
        <MonogramPagoPACompany shape="circle" />
      </Cell>
    </div>
  ),
}

export const FundedByNextGenerationEUVariants: Story = {
  name: "FundedByNextGenerationEU",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-8 rounded-lg bg-card p-6 shadow-elevation-4">
        <FundedByNextGenerationEU variant="outline" />
        <FundedByNextGenerationEU variant="filled" />
      </div>
      <div className="flex flex-wrap items-center gap-8 rounded-lg bg-foreground p-6">
        <FundedByNextGenerationEU variant="color" color="light" />
        <FundedByNextGenerationEU variant="color" color="pantone" />
      </div>
    </div>
  ),
}
