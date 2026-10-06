import { Product } from "@/schemas/product.schema"

interface ProductGridProps {
    products: Product[]
}

export default function ProductGirid({
    products
}:ProductGridProps) {
    return (
        <div>
            {products.map((p) => 
                <h1 key={p.id}>{p.name}</h1>
            )}
        </div>
    )
}