import { productSchema } from "@/schemas/product.schema"
import { createClient } from "../client"
import { devError, devLog } from "../utils"

const supabase = createClient()

export default async function getProductsQuery(
    from: number = 0,
    to: number = 14
) {
    try {
        const { data, error } = await supabase
            .from("products")
            .select(
                "id, sku, brand, name, color, size, normalPrice, category, subCategory",
                { count: "exact" }
            )
            .eq("isDeleted", false)
            .order("createdAt", { ascending: false })
            .order("id", { ascending: false })
            .range(from, to)

        if (error) throw error

        return productSchema.array().parse(data)
    } catch (err) {
        devLog("Gagal ambil data produk")
        devError(err)
        throw err
    }
}

export async function searchProductQuery(
    keywords: string,
    from: number = 0,
    to: number = 14
) {
    try {
        let query = supabase
            .from("products")
            .select(
                "id, sku, brand, name, color, size, normalPrice, category, subCategory"
            )
            .eq("isDeleted", false)

        const terms = keywords.trim().split(/\s+/).filter(Boolean)

        for (const term of terms) {
            const pattern = `%${term}%`

            query = query.or(
                [
                    `sku.ilike.${pattern}`,
                    `name.ilike.${pattern}`,
                    `brand.ilike.${pattern}`,
                    `category.ilike.${pattern}`,
                    `subCategory.ilike.${pattern}`,
                    `color.ilike.${pattern}`,
                    `size.ilike.${pattern}`,
                ].join(",")
            )
        }

        const { data, error } = await query
            .order("createdAt", { ascending: false })
            .order("id", { ascending: false })
            .range(from, to)

        if (error) throw error

        return productSchema.array().parse(data)
    } catch (err) {
        devLog("Gagal cari produk")
        devError(err)
        throw err
    }
}
