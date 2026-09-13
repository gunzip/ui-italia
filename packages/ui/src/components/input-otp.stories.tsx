import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp"
import { Label } from "./label"

const meta = {
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    maxLength: 6,
    children: null,
  },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="otp-default">Verification code</Label>
      <InputOTP id="otp-default" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", {
      name: "Verification code",
    })
    await userEvent.type(input, "123456")
    await expect(input).toHaveValue("123456")
  },
}

export const WithSeparator: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="otp-separator">Verification code</Label>
      <InputOTP id="otp-separator" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}

export const Invalid: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="otp-invalid">Verification code</Label>
      <InputOTP
        id="otp-invalid"
        maxLength={6}
        aria-invalid
        aria-describedby="otp-invalid-error"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p id="otp-invalid-error" className="text-sm text-destructive">
        The code entered is incorrect.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  args: { maxLength: 6, children: null },
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="otp-disabled">Verification code</Label>
      <InputOTP id="otp-disabled" maxLength={6} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}
