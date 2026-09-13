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
    id: "FATT-001",
    status: "Pagata",
    method: "Carta di credito",
    amount: "€ 250,00",
  },
  {
    id: "FATT-002",
    status: "In attesa",
    method: "Bonifico",
    amount: "€ 150,00",
  },
  { id: "FATT-003", status: "Scaduta", method: "Contanti", amount: "€ 350,00" },
  {
    id: "FATT-004",
    status: "Pagata",
    method: "Carta di credito",
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
      <TableCaption>Elenco delle fatture del periodo corrente.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Fattura</TableHead>
          <TableHead scope="col">Stato</TableHead>
          <TableHead scope="col">Metodo</TableHead>
          <TableHead scope="col" className="text-right">
            Importo
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
          <TableHead scope="col">Voce</TableHead>
          <TableHead scope="col" className="text-right">
            Importo
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Servizio annuale</TableCell>
          <TableCell className="text-right tabular-nums">€ 480,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Assistenza</TableCell>
          <TableCell className="text-right tabular-nums">€ 120,00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Totale</TableCell>
          <TableCell className="text-right tabular-nums">€ 600,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableCaption>Nessuna pratica trovata.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Protocollo</TableHead>
          <TableHead scope="col">Oggetto</TableHead>
          <TableHead scope="col">Stato</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={3}
            className="h-24 text-center text-muted-foreground"
          >
            Non ci sono elementi da mostrare.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
