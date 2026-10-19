import { Product, productSchema } from "@/schemas/product.schema"
import { useCallback, useRef, useState } from "react"
import getProductsQuery, { searchProductQuery } from "@/lib/query/product"
import { toast } from "@/components/ui/toast"

const PAGE_SIZE = 15

const productKeys = Object.keys(productSchema.shape) as (keyof Product)[]

const isSameProduct = (a: Product, b: Product) =>
    productKeys.every((key) => a[key] === b[key])

export default function useProducts(initialData: Product[]) {
    const currentpage = useRef(1)
    const [products, setProducts] = useState<Product[]>(initialData)
    const [hasMore, setHasMore] = useState<boolean>(
        initialData.length === PAGE_SIZE
    )
    const [isLoading, setIsLoading] = useState(false)

    const replaceProducts = useCallback((newProduts: Product[]) => {
        setProducts((prev) => {
            const prevById = new Map(prev.map((p) => [p.id, p]))

            const merged = newProduts.map((newItem) => {
                const oldItem = prevById.get(newItem.id)

                return oldItem && isSameProduct(oldItem, newItem)
                    ? oldItem
                    : newItem
            })

            const identical =
                merged.length === prev.length &&
                merged.every((item, i) => item === prev[i])

            return identical ? prev : merged
        })

        currentpage.current = 1
        setHasMore(false)
    }, [])

    const fetchProduct = useCallback(
        async (from: number = 0, to: number = PAGE_SIZE) => {
            try {
                if (isLoading) return
                setIsLoading(true)

                return await getProductsQuery(from, to)
            } catch (err) {
                toast.add({
                    title: "Gagal memuat produk",
                    type: "error",
                    description:
                        "Gagal mencari produk. Periksa koneksi internet kamu.",
                })
            } finally {
                setIsLoading(false)
            }
        },
        [isLoading]
    )

    const loadMore = useCallback(async () => {
        try {
            if (isLoading) return
            setIsLoading(true)

            const nextPage = currentpage.current + 1
            const from = (nextPage - 1) * PAGE_SIZE
            const to = nextPage * PAGE_SIZE - 1

            const result = await fetchProduct(from, to)
            if (result) {
                setProducts((prev) => [...prev, ...result]) // note: cek dulu harusnya agar tidak ada data yang duplikat
                currentpage.current = nextPage
                if (result.length < PAGE_SIZE) setHasMore(false)
            }
        } catch (err) {
            toast.add({
                type: "error",
                description:
                    "Gagal mencari produk. Periksa koneksi internet kamu.",
            })
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, fetchProduct])

    const searchProduct = useCallback(
        async (keyword: string) => {
            try {
                const result = await searchProductQuery(keyword, 0)
                if (result.length > 0) {
                    replaceProducts(result)
                    setHasMore(false)
                }
            } catch (err) {
                toast.add({
                    type: "error",
                    description:
                        "Gagal mencari produk. Periksa koneksi internet kamu.",
                })
            }
        },
        [replaceProducts]
    )

    return {
        products,
        hasMore,
        loadMore,
        replaceProducts,
        fetchProduct,
        searchProduct,
        isLoading,
        setIsLoading,
    }
}
