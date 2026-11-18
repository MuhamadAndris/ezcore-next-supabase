"use client"

import { Table, TableBody } from "@/components/ui/table"
import { Product } from "@/schemas/product.schema"
import { useCallback, useEffect, useRef, useState } from "react"
import Toolbar from "./table-toolbar-product"
import useProductSelection from "@/hooks/product/use-product-selection"
import useProducts from "@/hooks/product/use-products"
import FooterTableProduct from "./table-footer-product"
import EditProduct from "./edit-product"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import Image from "next/image"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../ui/item"
import { formatNumber } from "@/lib/utils"
import { IconDotsVertical } from "@tabler/icons-react"
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "../ui/popover"

interface TableProductsProps {
    count: number | null
    data: Product[] | []
}

export type ColumnVisible = {
    label: string
    isVisible: boolean
    align?: string
}

const columns = [
    {
        label: "STOK",
        isVisible: false,
        align: "text-center",
    },
]

export default function TableProducts({ count, data }: TableProductsProps) {
    console.log("render - product table")
    const { handleSelectionChange, onHaveSelected, productSelectedIds } =
        useProductSelection()
    const {
        hasMore,
        isLoading,
        setIsLoading,
        loadMore,
        products,
        replaceProducts,
        searchProduct,
    } = useProducts(data)
    const [onSelectedAll, setOnSelectedAll] = useState<boolean>(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daftar produk</CardTitle>
                <CardAction>
                    <Button>Tambah Produk</Button>
                </CardAction>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
                {products.map((product) => {
                    const productDesc = [
                        product.brand,
                        product.name,
                        product.color,
                        product.size,
                    ].join(" ")
                    return (
                        <Item key={product.id} className="flex-nowrap">
                            <ItemMedia variant="image" className="relative">
                                <Image
                                    alt="dumy product"
                                    src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                                    fill
                                    sizes="50px"
                                />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="max-w-[70%] ">
                                    <p className="truncate">{productDesc}</p>
                                </ItemTitle>
                                <ItemDescription>
                                    Rp. {formatNumber(product.normalPrice)} /pcs
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Popover>
                                    <PopoverTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                className="text-muted-foreground"
                                            >
                                                <IconDotsVertical />
                                            </Button>
                                        }
                                    />
                                    <PopoverContent>
                                        <Button variant="outline" size="sm">
                                            Pilih
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Ubah
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            Hapus
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </ItemActions>
                        </Item>
                    )
                })}
            </CardContent>
            <CardFooter className="w-full justify-between">
                {/* footer */}
                {/* <FooterTableProduct
                    count={count}
                    hasMore={hasMore}
                    isEmpty={products.length > 0}
                    isLoading={isLoading}
                    loadMore={loadMore}
                    shown={products.length}
                /> */}
            </CardFooter>
        </Card>
    )
}
