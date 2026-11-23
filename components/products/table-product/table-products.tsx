"use client"

import { useEffect, useState } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import TableRow from "./table-row"
import useProducts from "@/hooks/product/use-products"
import { Item, ItemContent, ItemTitle } from "../../ui/item"
import ItemSkeleton from "../../skeleton/item"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchButton, SearchInput } from "@/components/ui/search"
import { devLog } from "@/lib/utils"
import { IconPlus } from "@tabler/icons-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export type ColumnVisible = {
    label: string
    isVisible: boolean
    align?: string
}

const TableProducts = () => {
    devLog("Render table product")
    const [showSearchInput, setShowSearchInput] = useState(false)
    const {
        total,
        products,
        isLoading,
        fetchProduct,
        hasMore,
        loadMore,
        replaceProducts,
        searchProduct,
    } = useProducts([])

    useEffect(() => {
        const loadData = async () => {
            const results = await fetchProduct()

            if (!results || results.length === 0) return
            replaceProducts(results)
        }

        loadData()
    }, [fetchProduct, replaceProducts])
    return (
        <Card className="gap-0">
            <CardHeader className="items-center flex justify-between pb-2 gap-2">
                <CardTitle className="w-full">
                    {showSearchInput ? (
                        <SearchInput
                            placeholder="Cari SKU atau nama produk..."
                            onSearch={(keyword) => searchProduct(keyword)}
                            onClose={() => setShowSearchInput(false)}
                        />
                    ) : (
                        <p>Daftar produk</p>
                    )}
                </CardTitle>
                <CardAction className="flex gap-1 items-center">
                    <SearchButton
                        onClick={() => setShowSearchInput((prev) => !prev)}
                        isSearchOpen={showSearchInput}
                    />
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button>
                                    <IconPlus />
                                </Button>
                            }
                        />
                        <TooltipContent>Buat Produk Baru</TooltipContent>
                    </Tooltip>
                </CardAction>
            </CardHeader>
            <Separator />
            {isLoading ? (
                <ItemSkeleton qty={16} />
            ) : (
                <CardContent className="p-0">
                    {!isLoading && products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id} product={product} />
                        ))
                    ) : (
                        <Item>
                            <ItemContent>
                                <ItemTitle className="text-muted-foreground">
                                    Tidak ada produk
                                </ItemTitle>
                            </ItemContent>
                        </Item>
                    )}
                </CardContent>
            )}
            <CardFooter className="w-full justify-between">
                {/* footer */}
                {isLoading ? (
                    <Skeleton className="w-50 h-5" />
                ) : (
                    <CardDescription>
                        Menampilkan {products.length} dari {total} produk
                    </CardDescription>
                )}
                {hasMore && (
                    <CardAction>
                        <Button variant="outline" onClick={loadMore}>
                            Muat lebih banyak
                        </Button>
                    </CardAction>
                )}
            </CardFooter>
        </Card>
    )
}

export default TableProducts
