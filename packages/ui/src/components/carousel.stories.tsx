import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

const meta = {
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel aria-label="Example gallery" className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-6 text-2xl font-semibold">
                {index + 1}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const region = canvas.getByRole("region", { name: "Example gallery" })
    await expect(region).toHaveAttribute("aria-roledescription", "carousel")

    const slides = canvas.getAllByRole("group")
    await expect(slides).toHaveLength(5)
    for (const slide of slides) {
      await expect(slide).toHaveAttribute("aria-roledescription", "slide")
    }

    // The nav controls are wired to Embla. The Vitest browser runner does not
    // apply the Tailwind utilities, so the slides never overflow and Embla
    // keeps the controls disabled. Assert their presence and accessible names
    // rather than depending on a measured layout.
    await expect(
      canvas.getByRole("button", { name: "Previous slide" })
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: "Next slide" })
    ).toBeInTheDocument()
  },
}

export const MultipleSlides: Story = {
  render: () => (
    <Carousel aria-label="Multi-slide gallery" className="w-full max-w-sm">
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2">
            <div className="p-1">
              <div className="flex aspect-video items-center justify-center rounded-lg border bg-card p-4 text-lg font-medium">
                {index + 1}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
