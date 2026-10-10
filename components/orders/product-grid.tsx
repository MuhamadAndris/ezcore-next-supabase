import { Product } from "@/schemas/product.schema"
import ProductCard from "./product-card"
import { cn } from "@/lib/utils"
import { memo } from "react"

interface ProductGridProps {
    products: Product[]
}

const ProductGirid = memo(({
    products
}:ProductGridProps) => {
    console.log({
        "render": "Product Grid",
        "jumlah data": products.length
    })
    return (
        <div className={cn(
            "grid p-1",
            "gap-2 md:gap-4",
            "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
            products.length <= 4
                ? "lg:grid-cols-[repeat(auto-fit,minmax(150px,250px))]"
                : "lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        )}
        >
            {products.map((p) => 
                <ProductCard key={p.id} product={p} />
            )}
            </div>
    )
})

export default ProductGirid