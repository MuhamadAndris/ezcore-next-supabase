import { IconPlus, IconCloudUpload } from "@tabler/icons-react"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldLabel } from "../ui/field"
import CartItem from "./cart-item"
import { Button } from "../ui/button"
import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { memo, useEffect, useState } from "react"
import { CartReceipt } from "@/schemas/cart.schema"
import { devLog, formatNumber } from "@/lib/utils"
import useStoreUsers from "@/hooks/user/use-user"

interface CartReceipsProps {
    receipts: CartReceipt[] | null
    storeId: number | null
}

const CartReceipts = memo(({ receipts, storeId }: CartReceipsProps) => {
    devLog("render receipts")

    const [currentReceipt, setCurrentReceipt] = useState<CartReceipt | null>(
        receipts?.[0] ?? null
    )

    const { users } = useStoreUsers(storeId ?? undefined)

    useEffect(() => {
        if (!receipts?.length) {
            setCurrentReceipt(null)
            return
        }

        setCurrentReceipt((prev) => {
            if (prev && receipts.some((item) => item.id === prev.id)) {
                return prev
            }

            return receipts[0]
        })
    }, [receipts])

    if (!receipts || !storeId || !currentReceipt) return null

    return (
        <>
            <Field className="sticky top-0 bg-popover z-10 pb-3">
                <FieldLabel>
                    <span>Bon aktif</span>
                </FieldLabel>
                <ButtonGroup className="w-full overflow-x-auto">
                    {receipts.map((r) => (
                        <Button
                            key={r.id}
                            variant={
                                currentReceipt.code === r.code
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                currentReceipt !== r && setCurrentReceipt(r)
                            }
                        >
                            {r.code}
                        </Button>
                    ))}

                    <Button variant="outline">
                        <IconPlus />
                    </Button>
                </ButtonGroup>
            </Field>

            {/* Sale by user */}
            <Field>
                <FieldLabel>Penjual</FieldLabel>
                <Select items={users}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih penjual" />
                    </SelectTrigger>

                    <SelectContent>
                        {users.map((u) => (
                            <SelectItem
                                key={u.value}
                                value={currentReceipt.saleByUserId}
                            >
                                {u.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            {/* Items */}
            <Field>
                <FieldLabel>Daftar produk</FieldLabel>
                {currentReceipt.cartReceiptItems &&
                currentReceipt.cartReceiptItems.length > 0 ? (
                    currentReceipt.cartReceiptItems.map((i) => (
                        <CartItem key={i.id} item={i} />
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
                        {formatNumber(currentReceipt.subTotal)}/
                        {currentReceipt.totalQty} pcs
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
