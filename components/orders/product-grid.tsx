import { Product } from "@/schemas/product.schema"
import ProductCard from "./product-card"
import { cn } from "@/lib/utils"

interface ProductGridProps {
    products: Product[]
}

export default function ProductGirid({
    products
}:ProductGridProps) {

    return (
        <div className={cn(
            "grid p-1",
            "gap-2 md:gap-4",
            "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
            products.length <= 4
                ? "lg:grid-cols-[repeat(auto-fit,minmax(150px,200px))]"
                : "lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        )}
        >
            {products.map((p) => 
                <ProductCard key={p.id} product={p} />
            )}
            </div>
    )
}