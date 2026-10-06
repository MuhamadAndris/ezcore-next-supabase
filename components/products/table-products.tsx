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
import EditProduct from "./edit-product";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

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
        isVisible: false,
        align: "text-center"
    },
    {
        label: "DESKRIPSI PRODUK",
        isVisible: true
    },
    {
        label: "KATEGORI",
        isVisible: true,
    },
    {
        label: "STOK",
        isVisible: false,
        align: "text-center"
    },
    {
        label: "HARGA",
        isVisible: true,
        align: "text-right"
    },
    {
        label: "PROMO",
        isVisible: false
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

    const [ isModalOpened, setIsModalOpened ] = useState(false)

    const isDirty = useRef(false)

    const productId = useRef<number | null>(null)

    const handleEditProduct = useCallback(async (id:number) => {
        setIsModalOpened(true)
        productId.current = id
    }, [])

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
                            handleEditProduct={handleEditProduct}
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

            {/* Modal edit product */}
            <EditProduct
                productId={productId.current}
                open={isModalOpened}
                onOpenChange={(isOpen) => {
                    console.log("is open: " + isOpen)
                    isDirty.current = !isOpen
                }}
            />

            {/* Alert confirmation */}
            <AlertDialog open={isDirty.current}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Perubahan belum disimpan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda memiliki perubahan yang belum disimpan. Yakin ingin membatalkannya?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Lanjut Mengedit</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                setIsModalOpened(false)
                                isDirty.current = false
                                // NOTE: NEXT BUAT AGAR PAS ADA PERUBAHAN, DAN PAS MAU DI CLOSE SHEET NYA MUNCUL KAN ALERT KONFIRMASI

                            }}
                        >Buang Perubahan</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}