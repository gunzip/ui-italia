import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  component: Card,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Check IBAN</CardTitle>
        <CardDescription>
          Verifica l&apos;abbinamento di un IBAN ad un CF di un cittadino o di
          un&apos;impresa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body">Il prodotto è attivo da 12 mesi.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Attiva prodotto
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Raised: Story = {
  render: () => (
    <Card className="w-96 shadow-elevation-8">
      <CardHeader>
        <CardTitle>Check IBAN</CardTitle>
        <CardDescription>
          Card con elevazione 8 (`raised` in MUI).
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" size="sm">
          Attiva prodotto
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>3 files uploaded.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Manage the documents attached to your case.
        </p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Version with reduced spacing.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Card content.</p>
      </CardContent>
    </Card>
  ),
}

const cover =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='160' viewBox='0 0 400 160'%3E%3Crect width='400' height='160' fill='%23e3f2fd'/%3E%3C/svg%3E"

export const WithImage: Story = {
  render: () => (
    <Card className="w-96">
      <img src={cover} alt="" className="h-32 w-full object-cover" />
      <CardHeader>
        <CardTitle>Cover image</CardTitle>
        <CardDescription>The first image has no padding.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Card content.</p>
      </CardContent>
    </Card>
  ),
}
