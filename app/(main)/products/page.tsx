"use client"

import DashboardProduct from "@/components/products/dashboard-products"
import TableProducts from "@/components/products/table-product/table-products"

export default function ProductsPage() {
    return (
        <div className="space-y-4 md:p-4">
            {/* header */}
            <div className="flex gap-6 justify-between items-center p-2 md:p-0">
                <div>
                    <h1
                        className="
                        font-semibold
                        text-2xl
                        md:text-[32px]
                    "
                    >
                        Katalog Produk
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-md">
                        Kelola inventaris, harga, dan ketersedian produk
                    </p>
                </div>
            </div>

            {/* Dashboard - cards */}
            <DashboardProduct />

            {/* table */}
            <TableProducts />

            {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent></DialogContent>
            </Dialog> */}
        </div>
    )
}
