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
        <TabsTrigger value="notifications">Notifiche</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Gestisci i dati del tuo account.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Aggiorna la password di accesso.
      </TabsContent>
      <TabsContent value="notifications" className="p-4 text-muted-foreground">
        Configura le notifiche che ricevi.
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: "Password" }))
    await expect(
      await canvas.findByText("Aggiorna la password di accesso.")
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
        Gestisci i dati del tuo account.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Aggiorna la password di accesso.
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
        <TabsTrigger value="notifications">Notifiche</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 text-muted-foreground">
        Gestisci i dati del tuo account.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Aggiorna la password di accesso.
      </TabsContent>
      <TabsContent value="notifications" className="p-4 text-muted-foreground">
        Configura le notifiche che ricevi.
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
        Gestisci i dati del tuo account.
      </TabsContent>
      <TabsContent value="password" className="p-4 text-muted-foreground">
        Aggiorna la password di accesso.
      </TabsContent>
    </Tabs>
  ),
}
