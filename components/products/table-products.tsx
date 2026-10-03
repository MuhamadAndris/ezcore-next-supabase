"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import TableFilter from "./table-filter";
import TableHeaderProducts from "./table-header-products";
import TableRowProducts from "./table-row-product";
import LINK from "@/const/LINK";
import Link from "next/link";
import { Product } from "@/schemas/product.schema";
import { useRef, useState } from "react";
import { createClient } from "@/lib/client";

interface TableProductsProps {
    count: number | null
    data: Product[] | []
}

const PAGE_SIZE = 10

export default function TableProducts({
    count,
    data
}: TableProductsProps) {
    const [ products, setProducts ] = useState<Product[] | []>(data ?? [])
    const [ hasMore, setHasMore ] = useState<boolean>(true)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const currentpage = useRef(1);

    const handleFetchProduct = async () => {
        if(isLoading) return;
        setIsLoading(true);

        const nextPage = currentpage.current + 1;
        const from = (nextPage -1) * PAGE_SIZE;
        const to = nextPage * PAGE_SIZE - 1
        console.log("fetching products from", from, "to", to)

        const supabse = createClient();
        const { data, error } = await supabse
            .from("products")
            .select("*")
            .order("created_at", { ascending: false })
            .order("id", { ascending: false })
            .range(from, to);
        
        if (error) {
            console.error(error);
            setIsLoading(false);
            return;
        }

        setProducts((prev) => [...prev, ...data] );

        currentpage.current = nextPage;
        if(data.length < PAGE_SIZE) setHasMore(false)
        setIsLoading(false);
    }

    return (
        <div className="border md:rounded-md md:mx-4">
            <div className="sticky top-0 bg-background z-10 p-4 flex gap-4 items-center justify-between border-b rounded-t-md">
              <div className="flex-1 flex gap-4 items-center">
                
                {/* search input */}
                <div className="relative flex items-center w-full">
                  <IconSearch className="absolute left-2 text-muted-foreground" />
                  <Input
                      placeholder="Cari SKU atau nama produk..."
                      className="w-full h-10 pl-10"
                  />
                </div>

                {/* filter */}
                <TableFilter />
            </div>

            {/* Add product btn */}
            <Link
                  href={LINK.NEW_PRODUCT}
                  className="
                      bg-primary
                      hover:bg-primary/90
                      text-primary-foreground
                      px-2 md:px-4 py-1 md:py-2
                      rounded-md
                      truncate
                      flex gap-3
                  ">
                    <IconPlus />
                    <span className="hidden md:inline">Tambah Produk</span>
              </Link>
            </div>

            <Table>
                <TableHeaderProducts />
                <TableBody>
                    { products.map((p, index) => 
                        <TableRowProducts key={p.sku} product={p} index={index} />
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8} className="p-4.25">
                            <div className="flex justify-between items-center">
                                <p className="text-muted-foreground">Menampilkan 1-{Math.min(currentpage.current * PAGE_SIZE, count || 0)} dari {count} produk</p>
                                <div className="flex gap-2">
                                    {hasMore && (
                                        <Button variant="outline" onClick={handleFetchProduct} disabled={isLoading}>
                                            {isLoading ? "Memuat..." : "Muat lebih banyak"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}