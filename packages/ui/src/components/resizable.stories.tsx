import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

const meta = {
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-96 rounded-lg border"
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-6 text-sm">
          One
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-6 text-sm">
          Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-64 w-96 rounded-lg border"
    >
      <ResizablePanel defaultSize="50%">
        <div
          tabIndex={0}
          className="flex h-full items-center justify-center p-6 text-sm"
        >
          Top
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div
          tabIndex={0}
          className="flex h-full items-center justify-center p-6 text-sm"
        >
          Bottom
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const WithoutHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-96 rounded-lg border"
    >
      <ResizablePanel defaultSize="30%">
        <div className="flex h-full items-center justify-center p-6 text-sm">
          Navigation
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%">
        <div className="flex h-full items-center justify-center p-6 text-sm">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
