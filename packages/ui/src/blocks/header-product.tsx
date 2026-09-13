import * as React from "react"
import { cn } from "cn"

import { Badge } from "ui-italia/components/badge"
import { PartyAccountItem } from "./party-account-item"
import { PartySwitch, type PartySwitchItem } from "./party-switch"
import { ProductSwitch, type ProductSwitchItem } from "./product-switch"

export type ProductEntity = ProductSwitchItem
export type PartyEntity = PartySwitchItem
export type ChipColors =
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"

const chipVariant = {
  default: "neutral",
  primary: "primary",
  secondary: "highlight",
  error: "destructive",
  info: "info",
  success: "success",
  warning: "warning",
} as const

interface HeaderProductProps extends React.ComponentProps<"div"> {
  chipColor?: ChipColors
  chipLabel?: string
  onSelectedParty?: (party: PartySwitchItem) => void
  onSelectedProduct?: (product: ProductSwitchItem) => void
  partyId?: string
  partyList?: PartySwitchItem[]
  productId?: string
  productsList: ProductSwitchItem[]
  maxCharactersNumberMultiLineButton?: number
  maxCharactersNumberMultiLineItem?: number
}

/**
 * Port of mui-italia `HeaderProduct`: product switcher (+ chip) on the left,
 * party switcher / account item on the right.
 */
function HeaderProduct({
  chipColor = "primary",
  chipLabel,
  onSelectedParty,
  onSelectedProduct = () => {},
  partyId,
  partyList,
  productId,
  productsList,
  maxCharactersNumberMultiLineButton,
  maxCharactersNumberMultiLineItem,
  className,
  ...props
}: HeaderProductProps) {
  const selectedProduct = React.useMemo(() => {
    if (productsList.length === 0) return undefined
    return productId
      ? productsList.find((p) => p.id === productId)
      : productsList[0]
  }, [productId, productsList])

  const selectedParty = React.useMemo(() => {
    if (!partyList || partyList.length === 0) return undefined
    return partyId ? partyList.find((p) => p.id === partyId) : partyList[0]
  }, [partyId, partyList])

  const chip = chipLabel ? (
    <Badge variant={chipVariant[chipColor]}>{chipLabel}</Badge>
  ) : null

  return (
    <div
      data-slot="header-product"
      className={cn(
        "flex min-h-12 items-center border-b border-border bg-card md:min-h-20",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-2">
          {selectedProduct?.icon ? (
            <span aria-hidden="true" className="[&_svg]:size-8">
              {selectedProduct.icon}
            </span>
          ) : null}
          {selectedProduct && productsList.length > 1 ? (
            <div className="flex items-center gap-2">
              <ProductSwitch
                currentProductId={selectedProduct.id}
                products={productsList}
                onExit={onSelectedProduct}
              />
              {chip}
            </div>
          ) : selectedProduct ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground sm:text-[28px]">
                {selectedProduct.title}
              </span>
              {chip}
            </div>
          ) : null}
        </div>

        <div className="max-w-[25rem]">
          {partyList && selectedParty && partyList.length > 1 ? (
            <PartySwitch
              currentPartyId={selectedParty.id}
              parties={partyList}
              onExit={onSelectedParty}
              maxCharactersNumberMultiLineButton={
                maxCharactersNumberMultiLineButton
              }
              maxCharactersNumberMultiLineItem={
                maxCharactersNumberMultiLineItem
              }
            />
          ) : partyList && selectedParty ? (
            <div className="hidden md:block">
              <PartyAccountItem
                partyName={selectedParty.name}
                partyRole={selectedParty.productRole}
                parentPartyName={selectedParty.parentName}
                image={selectedParty.logoUrl}
                maxCharactersNumberMultiLine={maxCharactersNumberMultiLineItem}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { HeaderProduct }
