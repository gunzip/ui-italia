import type { ComponentType } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import * as icons from "./index"

const entries = Object.entries(icons) as Array<
  [string, ComponentType<{ className?: string }>]
>

const meta = {
  title: "Assets/Icons",
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Italia custom icons (brand: CIE, SPID, PN, Interop, social, CheckIban). */
export const Overview: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6">
      {entries.map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-3 rounded-lg bg-card p-4 shadow-elevation-4"
        >
          <Icon className="size-8" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
}
