"use client"

import DashboardProduct from "@/components/products/dashboard-products";
import TableProducts from "@/components/products/table-products";
import LINK from "@/const/LINK";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <>
            {/* header */}
            <div className="flex gap-6 justify-between items-center p-2 m-4 md:p-0">
                <div>
                    <h1 className="
                        font-semibold
                        text-2xl
                        md:text-[32px]
                    ">
                        Katalog Produk
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-md">Kelola inventaris, harga, dan ketersedian produk</p>
                </div>
                <div>
                    <Link
                        href={LINK.NEW_PRODUCT}
                        className="
                            bg-primary
                            hover:bg-primary/90
                            text-primary-foreground
                            px-4 py-2
                            rounded-md
                            truncate
                        ">
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* Dashboard - cards */}
            <DashboardProduct />

            {/* table */}
            <TableProducts />

        </>
    )
}