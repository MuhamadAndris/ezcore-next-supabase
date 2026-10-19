import { memo, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { IconChevronDown, IconX } from "@tabler/icons-react"
import { Calendar } from "../ui/calendar"
import { id as idLocale } from "date-fns/locale"
import { cn, devLog } from "@/lib/utils"
import CartReceipts from "./cart-receipts"
import useUserStores from "@/hooks/store/use-store"
import { OrderCart } from "@/types/order-cart"

interface CartProps {
    closeCart: (v: boolean) => void
    cart: OrderCart
}

const CartContent = memo(({ closeCart, cart }: CartProps) => {
    const [showCalender, setShowCalender] = useState(false)
    const { stores } = useUserStores(cart.data?.userId)
    const currentStore = stores.find((s) => s.value === cart.data?.storeId)
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
                    <Field>
                        <FieldLabel htmlFor="store">Toko</FieldLabel>
                        <Select
                            items={stores}
                            value={cart.data?.storeId ?? null}
                            // onValueChange={(v) => cart.updatePurchasedAt(v)}
                        >
                            <SelectTrigger id="store">
                                <SelectValue placeholder="Pilih toko" />
                            </SelectTrigger>

                            <SelectContent>
                                {stores.map((store) => (
                                    <SelectItem
                                        key={store.value}
                                        value={store.value}
                                    >
                                        {store.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Select Date */}
                    <Field>
                        <FieldLabel htmlFor="date">Tanggal</FieldLabel>
                        <Popover
                            open={showCalender}
                            onOpenChange={setShowCalender}
                        >
                            <PopoverTrigger
                                id="date"
                                render={
                                    <Button
                                        variant={"outline"}
                                        data-empty={!cart.data?.purchasedAt}
                                        className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        {cart.data?.purchasedAt ? (
                                            format(
                                                cart.data?.purchasedAt,
                                                "PPP",
                                                {
                                                    locale: idLocale,
                                                }
                                            )
                                        ) : (
                                            <span>Pilih tanggal</span>
                                        )}
                                        <IconChevronDown data-icon="inline-end" />
                                    </Button>
                                }
                            />
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        cart.data?.purchasedAt ?? undefined
                                    }
                                    onSelect={(date) => {
                                        cart.updatePurchasedAt(date ?? null)
                                        setShowCalender(false)
                                    }}
                                    defaultMonth={
                                        cart.data?.purchasedAt ?? undefined
                                    }
                                    locale={idLocale}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>

                    {/* Receipt */}
                    <CartReceipts
                        storeId={cart.data?.storeId ?? null}
                        receipts={cart.data && cart.data.cartReceipts}
                    />

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

export default CartContent
