import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"

import { Calendar } from "./calendar"

const meta = {
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function SingleCalendar() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 8, 13)
  )

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      aria-label="Select a date"
      className="rounded-lg border"
    />
  )
}

function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 8, 8),
    to: new Date(2026, 8, 14),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      aria-label="Select a date range"
      className="rounded-lg border"
    />
  )
}

function DropdownCalendar() {
  const [selected, setSelected] = React.useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      aria-label="Select a date of birth"
      className="rounded-lg border"
    />
  )
}

export const Single: Story = {
  render: () => <SingleCalendar />,
}

export const Range: Story = {
  render: () => <RangeCalendar />,
}

export const DropdownCaption: Story = {
  render: () => <DropdownCalendar />,
}
