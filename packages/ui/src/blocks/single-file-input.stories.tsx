import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { SingleFileInput } from "./single-file-input"

const pdf = new File(["contenuto"], "documento_molto_lungo_di_esempio.pdf", {
  type: "application/pdf",
})

const meta = {
  title: "Blocks/SingleFileInput",
  component: SingleFileInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SingleFileInput>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  label: "Allega un documento",
  dropzoneLabel: "Trascina qui il file oppure",
  dropzoneButton: "Scegli file",
  accept: ["application/pdf"],
  onFileSelected: () => {},
}

export const Idle: Story = {
  args: { ...base, value: null },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Selected: Story = {
  args: { ...base, value: pdf, onFileRemoved: () => {} },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Loading: Story = {
  args: { ...base, value: null, loading: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Error: Story = {
  args: { ...base, value: null, error: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Rejected: Story = {
  args: {
    ...base,
    value: null,
    rejectedLabel: "Formato non supportato",
    onFileRejected: () => {},
  },
  render: (args) => <InteractiveRejected {...args} />,
}

/** Selects a wrong file type to surface the rejected state. */
function InteractiveRejected(
  props: React.ComponentProps<typeof SingleFileInput>
) {
  const [rejected, setRejected] = React.useState(false)
  return (
    <SingleFileInput
      {...props}
      value={null}
      onFileSelected={() => setRejected(false)}
      onFileRejected={() => setRejected(true)}
      rejectedLabel={rejected ? props.rejectedLabel : undefined}
    />
  )
}
