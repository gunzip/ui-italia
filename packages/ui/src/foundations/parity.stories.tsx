import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select"
import { Switch } from "../components/switch"

/**
 * Parity guard: locks the computed styles that make the Italia look
 * (themeNext reference). If a token or a component class drifts, this fails
 * with the expected value from `docs/parity-spec.md`.
 *
 * Add one assertion block per component when its parity is closed.
 */
const meta = {
  title: "Foundations/Parity guard",
  parameters: {
    layout: "centered",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ThemeAndComponents: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button data-testid="parity-button">Button</Button>
      <Badge data-testid="parity-badge" variant="info">
        Info
      </Badge>
      <Input data-testid="parity-input" placeholder="Input" />
      <div className="flex w-64 flex-col gap-2">
        <Label htmlFor="parity-select">Fruit</Label>
        <Select defaultValue="mela">
          <SelectTrigger id="parity-select" data-testid="parity-select-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mela">Apple</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Label>
        <Switch data-testid="parity-switch" defaultChecked />
        Notifications
      </Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Button — contained primary, medium (48px), 2px border.
    const button = getComputedStyle(canvas.getByTestId("parity-button"))
    await expect(button.backgroundColor).toBe("rgb(11, 62, 227)")
    await expect(button.height).toBe("48px")
    await expect(button.borderTopWidth).toBe("2px")
    await expect(button.fontWeight).toBe("600")

    // Badge — MIChip geometry: 40px radius, 12px/600 label, 3x8 padding.
    const badge = getComputedStyle(canvas.getByTestId("parity-badge"))
    await expect(badge.borderRadius).toBe("40px")
    await expect(badge.fontSize).toBe("12px")
    await expect(badge.fontWeight).toBe("600")
    await expect(badge.paddingTop).toBe("3px")
    await expect(badge.paddingLeft).toBe("8px")

    // Input — 56px medium, 600 weight, grey[650] border.
    const input = getComputedStyle(canvas.getByTestId("parity-input"))
    await expect(input.height).toBe("56px")
    await expect(input.fontWeight).toBe("600")
    await expect(input.borderTopColor).toBe("rgb(99, 107, 130)")

    // Select trigger — 56px medium, 600 weight.
    const trigger = getComputedStyle(
      canvas.getByTestId("parity-select-trigger")
    )
    await expect(trigger.height).toBe("56px")
    await expect(trigger.fontWeight).toBe("600")

    // Switch — 42x26 track, 22px thumb.
    const track = getComputedStyle(canvas.getByTestId("parity-switch"))
    await expect(track.width).toBe("42px")
    await expect(track.height).toBe("26px")
  },
}
