import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress, ProgressLabel, ProgressValue } from "./progress"

const meta = {
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
  render: ({ value }) => (
    <Progress value={value} className="w-72 flex-col">
      <div className="flex w-full items-center justify-between">
        <ProgressLabel>Progress</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
}

export const Indeterminate: Story = {
  args: {
    value: null,
  },
  render: ({ value }) => (
    <Progress value={value} className="w-72 flex-col">
      <div className="flex w-full items-center justify-between">
        <ProgressLabel>Loading</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
}

export const Complete: Story = {
  args: {
    value: 100,
  },
  render: ({ value }) => (
    <Progress value={value} className="w-72 flex-col">
      <div className="flex w-full items-center justify-between">
        <ProgressLabel>Complete</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
}
