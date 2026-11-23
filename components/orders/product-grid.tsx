import { Product } from "@/schemas/product.schema"
import ProductCard from "./product-card"
import { cn, devLog } from "@/lib/utils"
import { memo } from "react"

interface ProductGridProps {
    products: Product[]
    onAddToCart: (product: Product) => void
}

const ProductGrid = memo(({ products, onAddToCart }: ProductGridProps) => {
    devLog("render product grid")

    const qty = products.length

    return (
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
                products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={onAddToCart}
                    />
                ))
            )}
        </div>
    )
})

ProductGrid.displayName = "ProductGrid"

export default ProductGrid
