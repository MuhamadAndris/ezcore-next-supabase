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
import FilterProductTriggerd from "./filter-product"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"
import DetailProductContent from "../detail-product"
import { Spinner } from "@/components/ui/spinner"

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
        refreshData,
        hasMore,
        loadMore,
        onSearch,
        onFilter,
        productSelected,
        selectProduct,
        onOpenChange,
        isOpen,
    } = useProducts()
    const showSpinner = useMinimumLoading(isLoading, 900)
    const [showSkeleton, setShowSkeleton] = useState(true)

    const handleRefresh = async () => {
        setShowSearchInput(false)
        setShowSkeleton(true)
        try {
            await refreshData()
        } finally {
            setShowSkeleton(false)
        }
    }

    useEffect(() => {
        const firstLoad = async () => {
            try {
                await refreshData()
            } finally {
                setShowSkeleton(false)
            }
        }

        firstLoad()
    }, [refreshData])

    return (
        <Card className="gap-0 p-0 overflow-visible">
            <CardHeader className="items-center flex py-2! gap-2 sticky top-0 z-10 bg-popover border-b">
                <CardTitle className="w-full">
                    {showSearchInput ? (
                        <SearchInput
                            isLoading={showSpinner}
                            placeholder="Cari SKU atau nama produk..."
                            onSearch={onSearch}
                            onClose={() => setShowSearchInput(false)}
                        />
                    ) : (
                        <p>Daftar produk</p>
                    )}
                </CardTitle>
                <CardAction className="flex gap-1 items-center">
                    {/* Search Product */}
                    <SearchButton
                        onClick={() => setShowSearchInput((prev) => !prev)}
                        isSearchOpen={showSearchInput}
                    />
                    <FilterProductTriggerd onFilter={onFilter} />

                    {/* Refresh button */}
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleRefresh}
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
            {showSkeleton ? (
                <ItemSkeleton qty={16} />
            ) : (
                <CardContent className="p-0">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <TableRow
                                key={product.id}
                                product={product}
                                onSelected={selectProduct}
                            />
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
                        <Button
                            variant="outline"
                            disabled={isLoading}
                            onClick={loadMore}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Memuat...
                                </>
                            ) : (
                                "Muat lebih banyak"
                            )}
                        </Button>
                    </CardAction>
                )}
            </CardFooter>

            <DetailProductContent
                onOpenChange={onOpenChange}
                open={isOpen}
                product={productSelected}
            />
        </Card>
    )
}

export default TableProducts
