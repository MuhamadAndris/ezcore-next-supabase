import { ChangeEvent, memo, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { IconCameraRotate, IconTrash, IconX } from "@tabler/icons-react"
import { cn, compressImage, devLog, formatNumber } from "@/lib/utils"
import SelectStore from "./select-store"
import SelectDate from "./select-date"
import CartReceipts from "./cart-receipts"
import { UseOrderCartReturn } from "@/hooks/order/use-order-cart"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { toast } from "../ui/toast"
import { Input } from "../ui/input"

interface CartProps {
    closeCart: (v: boolean) => void
    cart: UseOrderCartReturn["cart"]
}

const CartContent = memo(({ closeCart, cart }: CartProps) => {
    devLog("render cart")

    const [showCalender, setShowCalender] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const proof = cart.currentReceipt.paymentProof
    const imageUrl = proof ? URL.createObjectURL(proof) : ""
    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddPaymentProof = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]

        if (!selectedFile) return

        const compressed = await compressImage(selectedFile)

        // max 2 mb
        if (compressed.size > 2 * 1024 * 1024) {
            toast.add({
                type: "error",
                title: "Ukuran gambar maximal 2 MB",
            })
            return
        }

        cart.addPaymentProof(compressed)
    }

    const handleDeletePaymentProof = () => {
        cart.addPaymentProof(null)
        setOpenDialog(false)
    }

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
                    <CartReceipts
                        cart={cart}
                        onPreview={setOpenDialog}
                        onAddPaymentProof={handleAddPaymentProof}
                        proof={proof}
                        proofUrl={imageUrl}
                    />

                    {/* Sub-total */}
                    <Field>
                        <FieldLabel>Detail</FieldLabel>
                        {cart.receipts.map((receipt) => (
                            <p
                                key={receipt.no}
                                className="text-muted-foreground flex justify-between"
                            >
                                <span>{receipt.no}</span>
                                <span>
                                    {formatNumber(receipt.subTotal)}/
                                    {receipt.totalQty}
                                </span>
                            </p>
                        ))}
                    </Field>
                </FieldGroup>
            </div>

            <CardFooter className="shrink-0 flex justify-between gap-3">
                <p className="font-bold text-lg">
                    {formatNumber(cart.data.grandTotal)}/
                    {formatNumber(cart.data.totalQty)}
                </p>
                <div className="space-x-2">
                    <Button variant="ghost" onClick={() => closeCart(false)}>
                        Batal
                    </Button>
                    <Button
                        onClick={cart.saveOrder}
                        disabled={!cart.isHaveItems}
                    >
                        Simpan
                    </Button>
                </div>
            </CardFooter>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bukti Pembayaran</DialogTitle>
                        <DialogDescription>
                            Bon: {cart.currentReceipt.no}
                        </DialogDescription>
                    </DialogHeader>
                    {proof && (
                        <div className="relative aspect-square w-full m-auto">
                            <Image
                                src={imageUrl}
                                alt="dummy Image"
                                className="object-contain"
                                fill
                                sizes="352px"
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={handleDeletePaymentProof}
                        >
                            <IconTrash />
                            hapus
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => inputRef.current?.click()}
                        >
                            <Input
                                ref={inputRef}
                                onChange={(e) => handleAddPaymentProof(e)}
                                accept="image/png, image/jpg, image/webp"
                                type="file"
                                className="hidden"
                                capture="environment"
                            />
                            <IconCameraRotate />
                            Upload Ulang
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
})

CartContent.displayName = "CartContent"

export default CartContent
