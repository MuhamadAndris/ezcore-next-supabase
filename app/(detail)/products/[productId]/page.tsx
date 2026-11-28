import ProductNotFound from "@/app/(main)/products/product-not-found"
import ProductDetailContent from "@/components/products/product-detail-content"
import { createClient } from "@/lib/server"
import { devError } from "@/lib/utils"
import { Product, productSchema } from "@/schemas/product.schema"

interface Props {
    params: Promise<{
        productId: number
    }>
}

export default async function ProductDetailPage({ params }: Props) {
    const { productId } = await params
    const getProductById = async () => {
        try {
            const supabase = await createClient()
            const { data, error } = await supabase
                .from("products")
                .select(
                    "id, sku, brand, name, color, size, normalPrice, category, subCategory"
                )
                .eq("isDeleted", false)
                .eq("id", productId)
                .maybeSingle()

            if (!data) return null

            if (error) throw error

            return productSchema.parse(data)
        } catch (err) {
            devError(err)
            return null
        }
    }

    const product = await getProductById()

    if (!product) return <ProductNotFound productId={productId} />

    return <ProductDetailContent product={product} />
}
