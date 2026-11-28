"use client"

import { Product } from "@/schemas/product.schema"
import { Button } from "../ui/button"
import Image from "next/image"
import {
    IconCheck,
    IconCopy,
    IconDots,
    IconDotsVertical,
    IconEdit,
    IconShare,
    IconTrash,
} from "@tabler/icons-react"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from "../ui/item"
import { cn, devError, formatNumber } from "@/lib/utils"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useMessage } from "@/contexts/message-context"
import AppHeader, { AppHeaderAction } from "../ui/app-header"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

interface DetailProductProps {
    product: Product
}

export default function ProductDetailContent({ product }: DetailProductProps) {
    return (
        <div className="w-full">
            <AppHeader title="Detail Produk">
                <AppHeaderAction>
                    <Button variant="outline" size="icon">
                        <IconShare />
                    </Button>
                </AppHeaderAction>
            </AppHeader>

            <ProductInformation
                product={product}
                className="md:m-5 rounded-none md:rounded-2xl"
            />

            <div className="fixed bottom-0 right-0 w-full flex justify-end gap-4 bg-popover border-t py-2 px-4">
                <Button variant="destructive">
                    <IconTrash /> Hapus
                </Button>
                <Button variant="outline">
                    <IconEdit />
                    Ubah
                </Button>
            </div>
        </div>
    )
}

interface ProductInformationProps extends React.ComponentProps<"div"> {
    product: Product
    children?: ReactNode
}
export function ProductInformation({
    product,
    children,
    ...props
}: ProductInformationProps) {
    const productDesc = [
        product.brand,
        product.name,
        product.color,
        product.size,
    ]
        .filter(Boolean)
        .join(" ")

    const [copied, setCopied] = useState(false)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])
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
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                setCopied(false)
            }, 2000)

            showMessage("SKU berhasil di salin")
        } catch (error) {
            devError("Gagal menyalin:", error)
        }
    }

    return (
        <Card {...props}>
            <CardContent className="md:grid md:grid-cols-2 gap-2 flex-1 max-w-200 mx-auto">
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

                {/* info */}
                <div className="space-y-1 h-full flex flex-col gap-4">
                    <div className="flex-1 space-y-4">
                        {/* SKU */}
                        {/* <span className="flex gap-2 items-center rounded-sm text-sm">
                            <span className="text-muted-foreground">SKU</span>
                            <span>{product.sku}</span>
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={handleCopy}
                            >
                                {copied ? <IconCheck /> : <IconCopy />}
                            </Button>
                        </span> */}

                        <Item className="p-0">
                            <ItemContent>
                                <ItemDescription>Deskripsi</ItemDescription>
                                <ItemTitle className="font-bold text-xl text-foreground">
                                    {productDesc}
                                </ItemTitle>
                            </ItemContent>
                        </Item>

                        <Item className="p-0">
                            <ItemContent>
                                <ItemDescription>Harga</ItemDescription>
                                <ItemTitle className="font-bold text-2xl text-foreground">
                                    Rp. {formatNumber(product.normalPrice)}
                                </ItemTitle>
                            </ItemContent>
                            <ItemActions>0 terjual</ItemActions>
                        </Item>

                        <Item className="p-0">
                            <ItemContent>
                                <ItemDescription>SKU</ItemDescription>
                                <ItemTitle>{product.sku}</ItemTitle>
                            </ItemContent>
                        </Item>

                        <Item className="p-0">
                            <ItemContent>
                                <ItemDescription>Kategori</ItemDescription>
                                <ItemTitle>{product.category}</ItemTitle>
                            </ItemContent>
                        </Item>

                        <Item className="p-0">
                            <ItemContent>
                                <ItemDescription>Sub-Kategori</ItemDescription>
                                <ItemTitle>{product.subCategory}</ItemTitle>
                            </ItemContent>
                        </Item>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function ProductInformationFooter({
    children,
    ...props
}: React.ComponentProps<"div">) {
    return <CardFooter {...props}>{children}</CardFooter>
}
