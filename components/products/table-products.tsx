"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import TableFilter from "./table-filter";
import TableHeaderProducts from "./table-header-products";
import TableRowProducts from "./table-row-product";
import LINK from "@/const/LINK";
import Link from "next/link";
import { Product } from "@/schemas/product.schema";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SearchProduct from "./search-product";
import Toolbar from "./table-toolbar-product";
import useProductSelection from "@/hooks/product/use-product-selection";
import useProducts from "@/hooks/product/use-products";
import FooterTableProduct from "./table-footer-product";

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
        label: "GAMBAR",
        isVisible: true,
        align: "text-center"
    },
    {
        label: "DESKRIPSI PRODUK",
        isVisible: true
    },
    {
        label: "KATEGORI",
        isVisible: true,
        align: "text-center"
    },
    {
        label: "STOK",
        isVisible: true,
        align: "text-center"
    },
    {
        label: "HARGA",
        isVisible: true,
        align: "text-right"
    },
    {
        label: "PROMO",
        isVisible: true
    },
]

export default function TableProducts({
    count,
    data
}: TableProductsProps) {
    console.log("render - product table")
    const { handleSelectionChange, onHaveSelected, productSelectedIds } = useProductSelection()
    const { hasMore, isLoading, loadMore, products, replaceProducts} = useProducts(data)
    const [ onSelectedAll, setOnSelectedAll ] = useState<boolean>(false)

    const [ columnVisible, setColumnVisible ] = useState<ColumnVisible[]>(columns)

    

    return (
        <div className="border md:rounded-md md:mx-4">
            <Toolbar setProducts={replaceProducts} />

            <Table>
                <TableHeaderProducts
                    onHaveSelected={onHaveSelected}
                    setOnSelectedAll={setOnSelectedAll}
                    columns={columnVisible}
                    setColumns={setColumnVisible}
                />
                <TableBody>
                    { products.map((p, index) => 
                        <TableRowProducts
                            key={p.sku}
                            product={p}
                            index={index}
                            onHaveSelected={onHaveSelected}
                            onSelectedAll={onSelectedAll}
                            onSelectionChange={handleSelectionChange}
                            columns={columnVisible}
                        />
                    )}
                </TableBody>
            </Table>

            {/* footer */}
            <FooterTableProduct
                count={count}
                hasMore={hasMore}
                isEmpty={products.length > 0}
                isLoading={isLoading}
                loadMore={loadMore}
                shown={products.length}
            />
        </div>
    )
}