import { Product, productSchema } from "@/schemas/product.schema";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/client";

const PAGE_SIZE = 15

// Ambil semua nama field dari skema (id, name, sku, size, ...)
const productKeys = Object.keys(productSchema.shape) as (keyof Product)[]

const isSameProduct = (a: Product, b: Product) => 
    productKeys.every((key) => a[key] === b[key])

export default function useProducts(initialData: Product[]) {
    const currentpage = useRef(1);
    const [ products, setProducts ] = useState<Product[]>(initialData)
    const [ hasMore, setHasMore ] = useState<boolean>(initialData.length > 0)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const replaceProducts = useCallback((newProduts: Product[]) => {
        setProducts((prev) => {
            const prevById = new Map(prev.map((p) => [p.id, p]))

            const merged = newProduts.map((newItem) => {
                const oldItem = prevById.get(newItem.id)

                return oldItem && isSameProduct(oldItem, newItem)
                    ? oldItem
                    : newItem
            });

            const identical =
                merged.length === prev.length &&
                merged.every((item, i) => item === prev[i])

            return identical ? prev : merged
        })

        currentpage.current = 1
        setHasMore(false)
    }, [])

    const loadMore = useCallback( async () => {
        if(isLoading) return;
        setIsLoading(true);

        const nextPage = currentpage.current + 1;
        const from = (nextPage -1) * PAGE_SIZE;
        const to = nextPage * PAGE_SIZE - 1

        const supabse = createClient();
        const { data, error } = await supabse
            .from("products")
            .select("*")
            .eq("is_deleted", false)
            .order("created_at", { ascending: false })
            .order("id", { ascending: false })
            .range(from, to);
        
        if (error) {
            toast.error("Gagal memuat produk")
            setIsLoading(false);
            return;
        }
    
        setProducts((prev) => [...prev, ...data] );

        currentpage.current = nextPage;
        if(data.length < PAGE_SIZE) setHasMore(false)
        setIsLoading(false);
    }, [isLoading])


    return { products, hasMore, isLoading, loadMore, replaceProducts }
}