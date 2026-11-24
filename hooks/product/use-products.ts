import { Product, ProductFilter, productSchema } from "@/schemas/product.schema"
import { useCallback, useRef, useState } from "react"
import getProductsQuery from "@/lib/query/product"
import { toast } from "@/components/ui/toast"
import useTotalProducts from "./use-total-products"

const PAGE_SIZE = 15

const productKeys = Object.keys(productSchema.shape) as (keyof Product)[]

const isSameProduct = (a: Product, b: Product) =>
    productKeys.every((key) => a[key] === b[key])

export default function useProducts(initialData: Product[]) {
    const total = useTotalProducts()
    const [filter, setFilter] = useState<ProductFilter>({})
    const currentpage = useRef(1)
    const [products, setProducts] = useState<Product[]>(initialData)
    const [hasMore, setHasMore] = useState<boolean>(
        initialData.length === PAGE_SIZE
    )
    const [keyword, setKeyword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const loadingRef = useRef(false)

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
        async (nextFilter: ProductFilter, nextKeyword: string) => {
            if (loadingRef.current) return
            loadingRef.current = true
            setIsLoading(true)
            try {
                const results = await getProductsQuery(
                    0,
                    PAGE_SIZE,
                    nextFilter,
                    nextKeyword
                )
                replaceProducts(results)
            } catch {
                toast.add({
                    title: "Gagal memuat produk",
                    type: "error",
                    description:
                        "Gagal mencari produk. Periksa koneksi internet kamu.",
                })
            } finally {
                loadingRef.current = false
                setIsLoading(false)
            }
        },
        [replaceProducts]
    )

    // const loadMore = useCallback(async () => {
    //     if (loadingRef.current) return
    //     loadingRef.current = true
    //     setIsLoading(true)
    //     try {
    //         const nextPage = currentpage.current + 1
    //         const from = (nextPage - 1) * PAGE_SIZE
    //         const to = nextPage * PAGE_SIZE - 1

    //         const result = await fetchProduct(from, to)
    //         if (result) {
    //             setProducts((prev) => [...prev, ...result]) // note: cek dulu harusnya agar tidak ada data yang duplikat
    //             currentpage.current = nextPage
    //             if (result.length < PAGE_SIZE) setHasMore(false)
    //         }
    //     } catch {
    //         toast.add({
    //             type: "error",
    //             description:
    //                 "Gagal mencari produk. Periksa koneksi internet kamu.",
    //         })
    //     } finally {
    //         loadingRef.current = false
    //         setIsLoading(false)
    //     }
    // }, [fetchProduct])

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

    const refreshData = useCallback(() => {
        setKeyword("")
        setFilter({})
        fetchProduct({}, "")
    }, [fetchProduct])

    return {
        total,
        products,
        hasMore,
        isLoading,
        filter,
        // loadMore,
        refreshData,
        fetchProduct,
        onSearch,
        onFilter,
    }
}
