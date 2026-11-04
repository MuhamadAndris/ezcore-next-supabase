import { IconPlus, IconCloudUpload } from "@tabler/icons-react"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import Image from "next/image"
import { memo } from "react"
import { devLog, formatNumber } from "@/lib/utils"
import SelectUser from "./select-user"
import CartItem from "./cart-item"
import { UseOrderCartReturn } from "@/hooks/order/use-order-cart"

interface CartReceipsProps {
    cart: UseOrderCartReturn["cart"]
}

const CartReceipts = memo(({ cart }: CartReceipsProps) => {
    devLog("render receipts")

    return (
        <>
            <Field className="sticky top-0 bg-popover z-10 pb-3">
                <FieldLabel>
                    <span>Bon aktif</span>
                </FieldLabel>
                <ButtonGroup className="w-full overflow-x-auto">
                    {cart.receipts.map((r) => (
                        <Button
                            key={r.no}
                            variant={
                                cart.currentReceipt.no === r.no
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                cart.currentReceipt.no !== r.no &&
                                cart.setCurrentReceiptNo(r.no)
                            }
                        >
                            {r.no}
                        </Button>
                    ))}

                    <Button variant="outline" onClick={cart.addCartReceipt}>
                        <IconPlus />
                    </Button>
                </ButtonGroup>
            </Field>

            {/* Sale by user */}
            <SelectUser
                updateUserSelected={cart.updateSaleByUser}
                userSelected={cart.currentReceipt.saleByUser}
                receiptNo={cart.currentReceipt.no}
            />

            {/* Items */}
            <Field>
                <FieldLabel>Daftar produk</FieldLabel>
                {cart.currentReceipt.CartItems.length > 0 ? (
                    cart.currentReceipt.CartItems.map((i) => (
                        <CartItem
                            onAddQty={cart.addQty}
                            onReduceQty={cart.reduceQty}
                            key={i.product.id}
                            item={i}
                        />
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">
                        tidak ada item
                    </p>
                )}

                {/* Sub total */}
                <p className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>
                        {formatNumber(cart.currentReceipt.subTotal)}/
                        {cart.currentReceipt.totalQty} pcs
                    </span>
                </p>
            </Field>

            {/* Payment proof */}
            <Field>
                <FieldLabel>Bukti pembayaran</FieldLabel>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="
                            text-muted-foreground
                            flex-1 flex flex-col justify-center items-center
                            border-3 border-dotted hover:border-foreground/60
                            h-full p-1 rounded-lg cursor-pointer
                        "
                    >
                        <IconCloudUpload />
                        Upload foto Struk
                    </Button>
                    <div className="relative bg-yellow-300 aspect-square h-15">
                        <Image
                            src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                            alt="dummy Image"
                            className="object-contain"
                            fill
                            sizes="60px"
                        />
                    </div>
                </div>
            </Field>
        </>
    )
})

CartReceipts.displayName = "CartReceipts"

export default CartReceipts
