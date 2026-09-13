import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui-italia/components/dropdown-menu"

export type ProductSwitchLinkType = "internal" | "external"

export interface ProductSwitchItem {
  id: string
  title: string
  productUrl: string
  linkType?: ProductSwitchLinkType
  icon?: React.ReactNode
}

interface ProductSwitchProps {
  currentProductId: string
  products: ProductSwitchItem[]
  onExit?: (product: ProductSwitchItem) => void
}

/**
 * Port of mui-italia `ProductSwitch`: current product title + dropdown to
 * switch product.
 */
function ProductSwitch({
  currentProductId,
  products,
  onExit,
}: ProductSwitchProps) {
  const [selectedId, setSelectedId] = React.useState(currentProductId)

  React.useEffect(() => setSelectedId(currentProductId), [currentProductId])

  const selected = products.find((product) => product.id === selectedId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="link"
            className="text-xl font-bold sm:text-[28px]"
            aria-label="Seleziona prodotto"
          />
        }
      >
        {selected?.title}
        <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" aria-label="Seleziona i tuoi prodotti">
        {products.map((product) => (
          <DropdownMenuItem
            key={product.id}
            onClick={() => {
              if ((product.linkType ?? "internal") === "internal") {
                setSelectedId(product.id)
              }
              onExit?.(product)
            }}
          >
            {product.icon}
            {product.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ProductSwitch }
