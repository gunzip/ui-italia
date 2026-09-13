import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { TriangleAlertIcon } from "lucide-react"

import { Alert } from "../components/alert"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Field, FieldDescription, FieldError } from "../components/field"
import { Input } from "../components/input"
import { Label } from "../components/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../components/pagination"
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
      <Alert data-testid="parity-alert" variant="warning">
        <TriangleAlertIcon />
        <span>Warning</span>
      </Alert>
      <Alert
        data-testid="parity-alert-filled"
        variant="warning"
        appearance="filled"
      >
        <TriangleAlertIcon />
        <span>Warning</span>
      </Alert>
      <Pagination data-testid="parity-pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" data-testid="parity-pagination-link">
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Field>
        <FieldDescription data-testid="parity-field-description">
          Helper text
        </FieldDescription>
        <FieldError data-testid="parity-field-error">Error text</FieldError>
      </Field>
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
    // Chip info — muted surface / strong text (#E1F5FE / #225C76).
    await expect(badge.backgroundColor).toBe("rgb(225, 245, 254)")
    await expect(badge.color).toBe("rgb(34, 92, 118)")

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

    // Alert warning — icon uses the bright `main` (#FFC824), not `-strong`.
    const alertIcon = canvas
      .getByTestId("parity-alert")
      .querySelector("svg") as SVGElement
    await expect(getComputedStyle(alertIcon).color).toBe("rgb(255, 200, 36)")

    // Alert filled (`MIAlert` default) — warning-100 surface, warning-500 full
    // border, warning-850 icon (`SpidSelectOIDialog`).
    const filledAlert = getComputedStyle(
      canvas.getByTestId("parity-alert-filled")
    )
    await expect(filledAlert.backgroundColor).toBe("rgb(255, 245, 218)")
    await expect(filledAlert.borderTopColor).toBe("rgb(255, 200, 36)")
    await expect(filledAlert.borderRadius).toBe("8px")
    const filledIcon = canvas
      .getByTestId("parity-alert-filled")
      .querySelector("svg") as SVGElement
    await expect(getComputedStyle(filledIcon).color).toBe("rgb(97, 76, 21)")

    // Pagination — MIChip/MUI item is 32×32.
    const pageLink = getComputedStyle(
      canvas.getByTestId("parity-pagination-link")
    )
    await expect(pageLink.width).toBe("32px")
    await expect(pageLink.height).toBe("32px")

    // Field — helper 12/600 muted, error destructive.
    const helper = getComputedStyle(
      canvas.getByTestId("parity-field-description")
    )
    await expect(helper.fontSize).toBe("12px")
    await expect(helper.fontWeight).toBe("600")
    await expect(helper.color).toBe("rgb(85, 92, 112)")

    const errorText = getComputedStyle(canvas.getByTestId("parity-field-error"))
    await expect(errorText.color).toBe("rgb(209, 51, 51)")
  },
}
