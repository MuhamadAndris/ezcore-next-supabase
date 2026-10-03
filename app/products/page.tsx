import DashboardProduct from "@/components/products/dashboard-products";
import TableProducts from "@/components/products/table-products";
import { createClient } from "@/lib/client";
import { productSchema } from "@/schemas/product.schema";

export default async function ProductsPage() {
    const supabase = createClient();
    
    const { count, data, error } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(0, 9);

    if (error) console.error(error)
        
    const parsed = productSchema.array().safeParse(data ?? [])
    
    if(!parsed.success) {
        console.error(parsed.error)
    }

    const products = parsed.success ? parsed.data : []

    return (
        <>
            {/* header */}
            <div className="flex gap-6 justify-between items-center p-2 m-2 md:m-4 md:p-0">
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
            </div>

            {/* Dashboard - cards */}
            <DashboardProduct />

            {/* table */}
            <TableProducts count={count} data={products} />

        </>
    )
}