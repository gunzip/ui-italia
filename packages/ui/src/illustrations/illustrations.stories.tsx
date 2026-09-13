import type { ComponentType } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import * as illustrations from "./index"

const entries = Object.entries(illustrations) as Array<
  [
    string,
    ComponentType<{ title?: string; mode?: "light" | "dark"; size?: number }>,
  ]
>

const meta = {
  title: "Assets/Illustrations",
  parameters: {
    layout: "padded",
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

/** 1:1 port of the mui-italia illustration set. */
export const Overview: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-6">
      {entries.map(([name, Illustration]) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <Illustration size={80} />
          <span className="text-center text-xs text-muted-foreground">
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
}

/** Dark mode colors (`useIllustrationColors("dark")`). */
export const DarkMode: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-6 rounded-lg bg-foreground p-6">
      {entries.slice(0, 12).map(([name, Illustration]) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <Illustration size={80} mode="dark" />
          <span className="text-center text-xs text-white/70">{name}</span>
        </div>
      ))}
    </div>
  ),
}
