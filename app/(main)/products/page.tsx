"use client"

import DashboardProduct from "@/components/products/dashboard-products"
import TableProducts from "@/components/products/table-product/table-products"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ProductsPage() {
    return (
        <div className="space-y-2 md:space-y-4 md:p-4">
            <Card className="pb-4!">
                <CardHeader>
                    <CardTitle
                        className="
                        text-2xl
                        md:text-4xl
                    "
                    >
                        Katalog Produk
                    </CardTitle>
                    <CardDescription className="text-sm md:text-md">
                        Kelola inventaris, harga, dan ketersedian produk
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DashboardProduct />
                </CardContent>
            </Card>

            <TableProducts />

            {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent></DialogContent>
            </Dialog> */}
        </div>
    )
}
