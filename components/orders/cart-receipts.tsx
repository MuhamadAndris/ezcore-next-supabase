import {
    IconPlus,
    IconCameraPlus,
    IconCameraRotate,
    IconX,
} from "@tabler/icons-react"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import Image from "next/image"
import { ChangeEvent, memo, RefObject, useRef } from "react"
import { devLog, formatNumber } from "@/lib/utils"
import SelectUser from "./select-user"
import CartItem from "./cart-item"
import { UseOrderCartReturn } from "@/hooks/order/use-order-cart"
import { Input } from "../ui/input"

interface CartReceipsProps {
    cart: UseOrderCartReturn["cart"]
    onPreview: (v: boolean) => void
    proof: File | null
    proofUrl: string
    onAddPaymentProof: (e: ChangeEvent<HTMLInputElement>) => void
}

const CartReceipts = memo(
    ({
        cart,
        onPreview,
        onAddPaymentProof,
        proof,
        proofUrl,
    }: CartReceipsProps) => {
        devLog("render receipts")
        const inputRef = useRef<HTMLInputElement>(null)

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
                                onUpdatedPrice={cart.updateItemPrice}
                                onAddQty={cart.addQty}
                                onReduceQty={cart.reduceQty}
                                onDeleteItem={cart.deleteItem}
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
                        {proof && (
                            <div
                                className="relative aspect-square h-15 rounded-sm border cursor-pointer"
                                onClick={() => onPreview(true)}
                            >
                                <Image
                                    src={proofUrl}
                                    alt="dummy Image"
                                    className="object-contain"
                                    fill
                                    sizes="60px"
                                />
                            </div>
                        )}
                        <Input
                            ref={inputRef}
                            className="hidden"
                            type="file"
                            accept="image/png, image/jpg, image/webp"
                            onChange={(e) => onAddPaymentProof(e)}
                            capture="environment"
                        />
                        {!proof && (
                            <Button
                                variant="outline"
                                className="my-auto"
                                onClick={() => inputRef.current?.click()}
                            >
                                <IconCameraPlus />
                            </Button>
                        )}
                    </div>
                </Field>
            </>
        )
    }
)

CartReceipts.displayName = "CartReceipts"

export default CartReceipts
