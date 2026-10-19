import { Product } from "@/schemas/product.schema"
import ProductCard from "./product-card"
import { cn } from "@/lib/utils"
import { memo } from "react"
import SkeletonProductGrid from "../skeleton/product-grid"

interface ProductGridProps {
    products: Product[]
    isLoading: boolean
}

const ProductGrid = memo(({ products, isLoading }: ProductGridProps) => {
    const qty = products.length

    return isLoading ? (
        <SkeletonProductGrid />
    ) : (
        <div
            className={cn(
                "grid w-full p-1",
                "gap-2 md:gap-4",
                "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
                qty <= 4 && qty !== 0
                    ? "lg:grid-cols-[repeat(auto-fit,minmax(150px,250px))]"
                    : "lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
            )}
        >
            {qty === 0 ? (
                <p className="text-muted-foreground text-center">
                    produk tidak ada
                </p>
            ) : (
                products.map((p) => <ProductCard key={p.id} product={p} />)
            )}
        </div>
    )
})

export default ProductGrid
