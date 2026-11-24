import { Product, ProductFilter, productSchema } from "@/schemas/product.schema"
import { useCallback, useRef, useState } from "react"
import getProductsQuery from "@/lib/query/product"
import { toast } from "@/components/ui/toast"

const PAGE_SIZE = 14

const productKeys = Object.keys(productSchema.shape) as (keyof Product)[]

const isSameProduct = (a: Product, b: Product) =>
    productKeys.every((key) => a[key] === b[key])

export default function useProducts() {
    const currentpage = useRef(1)
    const [total, setTotal] = useState(0)
    const [filter, setFilter] = useState<ProductFilter>({})
    const [products, setProducts] = useState<Product[]>([])
    const [keyword, setKeyword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const loadingRef = useRef(false)

    const replaceProducts = useCallback((newProducts: Product[]) => {
        setProducts((prev) => {
            const prevById = new Map(prev.map((p) => [p.id, p]))
            const merged = newProducts.map((n) => {
                const old = prevById.get(n.id)
                return old && isSameProduct(old, n) ? old : n
            })
            const identical =
                merged.length === prev.length &&
                merged.every((item, i) => item === prev[i])
            return identical ? prev : merged
        })
    }, [])

    const fetchProduct = useCallback(
        async (nextFilter: ProductFilter, nextKeyword: string, page = 1) => {
            if (loadingRef.current) return
            loadingRef.current = true
            setIsLoading(true)
            try {
                const from = (page - 1) * PAGE_SIZE
                const to = page * PAGE_SIZE - 1
                const { products: result, count } = await getProductsQuery(
                    from,
                    to,
                    nextFilter,
                    nextKeyword
                )

                if (page === 1) {
                    replaceProducts(result)
                } else {
                    setProducts((prev) => {
                        const ids = new Set(prev.map((p) => p.id))
                        return [
                            ...prev,
                            ...result.filter((p) => !ids.has(p.id)),
                        ]
                    })
                }

                currentpage.current = page
                setTotal(count)
            } catch {
                toast.add({
                    /* ... */
                })
            } finally {
                loadingRef.current = false
                setIsLoading(false)
            }
        },
        [replaceProducts]
    )

    const loadMore = useCallback(
        () => fetchProduct(filter, keyword, currentpage.current + 1),
        [fetchProduct, filter, keyword]
    )

    const hasMore = products.length < total

    const onSearch = useCallback(
        (kw: string) => {
            setKeyword(kw)
            fetchProduct(filter, kw)
        },
        [filter, fetchProduct]
    )

    const onFilter = useCallback(
        (f: ProductFilter) => {
            setFilter(f)
            fetchProduct(f, keyword)
        },
        [keyword, fetchProduct]
    )

    const refreshData = useCallback(async () => {
        setKeyword("")
        setFilter({})
        await fetchProduct({}, "")
    }, [fetchProduct])

    return {
        total,
        products,
        hasMore,
        isLoading,
        filter,
        loadMore,
        refreshData,
        fetchProduct,
        onSearch,
        onFilter,
    }
}
