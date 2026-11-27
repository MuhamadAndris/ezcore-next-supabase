import { Product } from "@/schemas/product.schema"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import Image from "next/image"
import { IconCheck, IconCopy, IconEdit, IconTrash } from "@tabler/icons-react"
import { Item, ItemActions, ItemContent } from "../ui/item"
import { devError, formatNumber } from "@/lib/utils"
import { useState } from "react"
import { useMessage } from "@/contexts/message-context"

interface DetailProductProps {
    product: Product
    open: boolean
    onOpenChange: (v: boolean) => void
}

export default function DetailProductContent({
    onOpenChange,
    open,
    product,
}: DetailProductProps) {
    const productDesc = [
        product.brand,
        product.name,
        product.color,
        product.size,
    ].join(" ")

    const [copied, setCopied] = useState(false)
    const { showMessage } = useMessage()

    const handleCopy = async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(product.sku)
            } else {
                const textarea = document.createElement("textarea")

                textarea.value = product.sku
                textarea.style.position = "fixed"
                textarea.style.opacity = "0"

                document.body.appendChild(textarea)
                textarea.select()

                const success = document.execCommand("copy")
                document.body.removeChild(textarea)

                if (!success) throw new Error("Copy failed")
            }

            setCopied(true)
            showMessage("SKU berhasil di salin")
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            devError("Gagal menyalin:", error)
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription className="text-xs">
                        DETAIL PRODUK
                    </DialogDescription>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>

                {/* Image */}
                <div className="relative">
                    <Image
                        src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                        alt="dummy Image"
                        className="object-contain mx-auto"
                        height={500}
                        width={500}
                    />
                </div>

                <div className="space-y-1">
                    {/* Description */}
                    <h3>{productDesc}</h3>

                    {/* SKU */}
                    <div className="flex gap-2">
                        <span className="flex gap-2 items-center rounded-sm">
                            <span className="text-muted-foreground text-xs">
                                SKU
                            </span>
                            <span className="text-xs">{product.sku}</span>
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={handleCopy}
                            >
                                {copied ? <IconCheck /> : <IconCopy />}
                            </Button>
                        </span>
                        <span className="flex gap-2 items-center  py-1 px-2 rounded-sm">
                            <span className="text-muted-foreground text-xs">
                                Kategori:
                            </span>
                            <span className="text-xs">{product.category}</span>
                        </span>
                    </div>

                    {/* price */}
                    {/* <div className="bg-muted py-1 px-2 border rounded-sm"> */}
                    <Item className="p-0">
                        <ItemContent>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Harga Jual
                                </p>
                                <span className="text-lg font-bold">
                                    Rp. {formatNumber(product.normalPrice)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    /pcs
                                </span>
                            </div>
                        </ItemContent>
                        <ItemActions>
                            <div>
                                <div className="text-muted-foreground text-xs">
                                    Harga normal
                                </div>
                                <div className="text-muted-foreground line-through">
                                    Rp. {formatNumber(product.normalPrice)}
                                </div>
                            </div>
                        </ItemActions>
                    </Item>
                    {/* </div> */}
                </div>
                <DialogFooter className="flex-row justify-end">
                    <Button variant="destructive">
                        <IconTrash />
                        Hapus
                    </Button>
                    <Button variant="outline">
                        <IconEdit />
                        Ubah
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
