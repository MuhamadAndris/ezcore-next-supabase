import { memo, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { IconX } from "@tabler/icons-react"
import { cn, devLog } from "@/lib/utils"
import SelectStore from "./select-store"
import SelectDate from "./select-date"
import CartReceipts from "./cart-receipts"
import { UseOrderCartReturn } from "@/hooks/order/use-order-cart"

interface CartProps {
    closeCart: (v: boolean) => void
    cart: UseOrderCartReturn["cart"]
}

const CartContent = memo(({ closeCart, cart }: CartProps) => {
    const [showCalender, setShowCalender] = useState(false)

    devLog("render cart")

    return (
        <Card
            className={cn(
                "flex h-full min-h-0 flex-col",
                "lg:relative",
                "lg:w-full lg:h-full",
                "lg:grid lg:grid-rows-[1fr_auto]",
                "fixed top-0 right-0 w-full h-full z-11"
            )}
        >
            <div className="shrink-0 flex-1 overflow-auto">
                <CardHeader className="sticky top-0 bg-popover pb-3">
                    <CardTitle>Pesanan</CardTitle>
                    <CardAction>
                        <Button
                            variant="ghost"
                            className="rounded-full"
                            onClick={() => closeCart(false)}
                        >
                            <IconX />
                        </Button>
                    </CardAction>
                </CardHeader>

                <FieldGroup className="px-3">
                    {/* Select Store */}
                    <SelectStore
                        storeSelected={cart.data.storeSelected}
                        updateStoreSelected={cart.updateStoreSelected}
                    />

                    {/* Select Date */}
                    <SelectDate
                        setShowCalender={setShowCalender}
                        showCalender={showCalender}
                        purchasedAt={cart.data.purchasedAt}
                        updatePurchasedAt={cart.updatePurchasedAt}
                    />

                    {/* Receipt */}
                    <CartReceipts cart={cart} />

                    {/* Sub-total */}
                    <Field>
                        <FieldLabel>Detail</FieldLabel>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                    </Field>
                </FieldGroup>
            </div>

            <CardFooter className="shrink-0 flex justify-between gap-3">
                <p className="font-bold text-lg">500.000</p>
                <div className="space-x-2">
                    <Button variant="ghost" onClick={() => closeCart(false)}>
                        Batal
                    </Button>
                    <Button>Simpan</Button>
                </div>
            </CardFooter>
        </Card>
    )
})

CartContent.displayName = "CartContent"

export default CartContent
