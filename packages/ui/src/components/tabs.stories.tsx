import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Manage your account data.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Update your sign-in password.
      </TabsContent>
      <TabsContent value="notifications" className="p-4 text-muted-foreground">
        Configure the notifications you receive.
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: "Password" }))
    await expect(
      await canvas.findByText("Update your sign-in password.")
    ).toBeVisible()
  },
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Manage your account data.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Update your sign-in password.
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Manage your account data.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Update your sign-in password.
      </TabsContent>
      <TabsContent value="notifications" className="p-4 text-muted-foreground">
        Configure the notifications you receive.
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Manage your account data.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Update your sign-in password.
      </TabsContent>
    </Tabs>
  ),
}
