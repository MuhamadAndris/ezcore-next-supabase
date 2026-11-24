import { ProductFilter, productSchema } from "@/schemas/product.schema"
import { createClient } from "../client"
import { devError, devLog } from "../utils"

const supabase = createClient()

export async function getTotalProdutQuery() {
    try {
        const { count, error } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })

        if (error) throw error

        return count ?? 0
    } catch (err) {
        devLog("Gagal ambil total produk.")
        devError(err)
        throw err
    }
}

export default async function getProductsQuery(
    from: number = 0,
    to: number = 14,
    filter: ProductFilter = {},
    keywords: string = ""
) {
    try {
        let query = supabase
            .from("products")
            .select(
                "id, sku, brand, name, color, size, normalPrice, category, subCategory",
                { count: "exact" }
            )
            .eq("isDeleted", false)

        // Filter
        devLog(filter)
        if (filter.category && filter.category !== "")
            query = query.eq("category", filter.category)
        if (filter.brand && filter.brand !== "")
            query = query.eq("brand", filter.brand)

        // Keyword: tiap kata harus cocok di salah satu kolom
        const terms = keywords
            .replace(/[,()]/g, " ")
            .trim()
            .split(/\s+/)
            .filter(Boolean)

        for (const term of terms) {
            const pattern = `%${term}%`
            query = query.or(
                [
                    `sku.ilike.${pattern}`,
                    `name.ilike.${pattern}`,
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
