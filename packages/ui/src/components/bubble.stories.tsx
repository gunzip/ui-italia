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
        <BubbleContent>Buongiorno, come posso aiutarla?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Vorrei prenotare un appuntamento.</BubbleContent>
      </Bubble>
      <Bubble>
        <BubbleContent>Certamente, quale giorno preferisce?</BubbleContent>
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
          <BubbleContent>Variante “{variant}”</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const WithReactions: Story = {
  render: () => (
    <div className="w-80">
      <Bubble align="end">
        <BubbleContent>Ci vediamo domani alle 15?</BubbleContent>
        <BubbleReactions aria-label="Reazioni: 2">
          <span role="img" aria-label="Pollice in su">
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
