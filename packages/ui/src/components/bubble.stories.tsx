import type { Meta, StoryObj } from "@storybook/react-vite"

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble"

const meta = {
  component: Bubble,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = {
  render: () => (
    <BubbleGroup className="w-80">
      <Bubble>
        <BubbleContent>Good morning, how can I help you?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>I would like to book an appointment.</BubbleContent>
      </Bubble>
      <Bubble>
        <BubbleContent>Certainly, which day do you prefer?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}

export const Variants: Story = {
  render: () => (
    <BubbleGroup className="w-80">
      {(
        [
          "default",
          "secondary",
          "muted",
          "tinted",
          "outline",
          "destructive",
        ] as const
      ).map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>Variant “{variant}”</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const WithReactions: Story = {
  render: () => (
    <div className="w-80">
      <Bubble align="end">
        <BubbleContent>See you tomorrow at 3 PM?</BubbleContent>
        <BubbleReactions aria-label="Reactions: 2">
          <span role="img" aria-label="Thumbs up">
            👍
          </span>
          <span className="text-xs" aria-hidden="true">
            2
          </span>
        </BubbleReactions>
      </Bubble>
    </div>
  ),
}
