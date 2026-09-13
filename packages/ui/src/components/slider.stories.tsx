import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Slider } from "./slider"

const meta = {
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <span id="slider-volume-label" className="text-sm font-medium">
        Volume
      </span>
      <Slider
        aria-labelledby="slider-volume-label"
        defaultValue={40}
        step={1}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Volume" })
    slider.focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(slider).toHaveAttribute("aria-valuenow", "41")
  },
}

export const Range: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <span id="slider-price-label" className="text-sm font-medium">
        Price range
      </span>
      <Slider
        aria-labelledby="slider-price-label"
        defaultValue={[25, 75]}
        min={0}
        max={100}
      />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-48 flex-col items-center gap-2">
      <span id="slider-zoom-label" className="text-sm font-medium">
        Zoom
      </span>
      <Slider
        aria-labelledby="slider-zoom-label"
        orientation="vertical"
        defaultValue={60}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <span id="slider-disabled-label" className="text-sm font-medium">
        Brightness
      </span>
      <Slider
        aria-labelledby="slider-disabled-label"
        defaultValue={30}
        disabled
      />
    </div>
  ),
}
