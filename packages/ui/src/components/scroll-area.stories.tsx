import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea } from "./scroll-area"

const meta = {
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-lg border">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const FitContent: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-lg border">
      <div className="flex flex-col gap-2 p-4">
        <div className="rounded-md bg-muted px-3 py-2 text-sm">
          Content that does not require scrolling.
        </div>
      </div>
    </ScrollArea>
  ),
}

export const WithSeparators: Story = {
  render: () => (
    <ScrollArea className="h-56 w-72 rounded-lg border">
      <div className="p-4">
        {[
          "Registry",
          "Taxes",
          "School",
          "Mobility",
          "Health",
          "Environment",
          "Culture",
        ].map((item) => (
          <div key={item} className="border-b py-2 text-sm last:border-b-0">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
