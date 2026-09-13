import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const invoices = [
  {
    id: "INV-001",
    status: "Paid",
    method: "Credit card",
    amount: "€ 250,00",
  },
  {
    id: "INV-002",
    status: "Pending",
    method: "Bank transfer",
    amount: "€ 150,00",
  },
  { id: "INV-003", status: "Overdue", method: "Cash", amount: "€ 350,00" },
  {
    id: "INV-004",
    status: "Paid",
    method: "Credit card",
    amount: "€ 450,00",
  },
]

const meta = {
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>List of invoices for the current period.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Invoice</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col">Method</TableHead>
          <TableHead scope="col" className="text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Item</TableHead>
          <TableHead scope="col" className="text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Annual service</TableCell>
          <TableCell className="text-right tabular-nums">€ 480,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Support</TableCell>
          <TableCell className="text-right tabular-nums">€ 120,00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums">€ 600,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableCaption>No cases found.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Protocol</TableHead>
          <TableHead scope="col">Subject</TableHead>
          <TableHead scope="col">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={3}
            className="h-24 text-center text-muted-foreground"
          >
            There are no items to show.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
