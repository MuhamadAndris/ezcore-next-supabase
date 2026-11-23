"use client"

import { useEffect, useRef, useState } from "react"
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
import { cn, devLog } from "@/lib/utils"
import { IconPlus, IconRefresh } from "@tabler/icons-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import FilterProduct from "./table-filter"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"

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
    const showSpinner = useMinimumLoading(isLoading, 900)

    const keyRef = useRef("")

    const handleSearch = (k: string) => {
        keyRef.current = k
        searchProduct(k)
    }
    const refreshData = async () => {
        const keyword = keyRef.current
        if (keyword.length > 0) {
            searchProduct(keyword)
        } else {
            const results = await fetchProduct()

            if (!results || results.length === 0) return
            replaceProducts(results)
        }
    }

    useEffect(() => {
        refreshData()
    }, [fetchProduct, replaceProducts])
    return (
        <Card className="gap-0 p-0">
            <CardHeader className="items-center flex justify-between py-2 gap-2">
                <CardTitle className="w-full">
                    {showSearchInput ? (
                        <SearchInput
                            placeholder="Cari SKU atau nama produk..."
                            onSearch={handleSearch}
                            onClose={() => setShowSearchInput(false)}
                        />
                    ) : (
                        <p>Daftar produk</p>
                    )}
                </CardTitle>
                <CardAction className="flex gap-1 items-center">
                    {/* Search Product */}
                    <SearchButton
                        onClick={() => {
                            if (showSearchInput) keyRef.current = ""
                            setShowSearchInput((prev) => !prev)
                        }}
                        isSearchOpen={showSearchInput}
                    />
                    <FilterProduct />

                    {/* Refresh button */}
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={refreshData}
                                >
                                    <IconRefresh
                                        className={cn(
                                            showSpinner &&
                                                "animate-spin motion-reduce:animate-none"
                                        )}
                                    />
                                </Button>
                            }
                        />
                        <TooltipContent>Refresh</TooltipContent>
                    </Tooltip>

                    {/* Create new produk */}
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
