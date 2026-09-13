import type { Meta, StoryObj } from "@storybook/react-vite"
import { InboxIcon, SearchXIcon } from "lucide-react"

import { Button } from "./button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"

const meta = {
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          You have not received any messages yet. When they arrive, you will
          find them here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Create message</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithDefaultMedia: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia>
          <SearchXIcon aria-hidden="true" className="size-10" />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Try changing the search filters or using different keywords.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyTitle>No data available</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithMultipleActions: Story = {
  render: () => (
    <Empty className="w-96 border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>Empty folder</EmptyTitle>
        <EmptyDescription>
          Import your documents or start one from scratch.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Import
          </Button>
          <Button size="sm">New document</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}
