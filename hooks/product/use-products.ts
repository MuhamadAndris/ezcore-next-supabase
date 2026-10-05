import { Product } from "@/schemas/product.schema";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/client";

const PAGE_SIZE = 15

export default function useProducts(initialData: Product[]) {
    const currentpage = useRef(1);
    const [ products, setProducts ] = useState<Product[]>(initialData)
    const [ hasMore, setHasMore ] = useState<boolean>(initialData.length > 0)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

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

    const replaceProducts = useCallback((newProduts: Product[]) => {
        setProducts(newProduts)
        currentpage.current = 1
        setHasMore(false)
    }, [])


    return { products, hasMore, isLoading, loadMore, replaceProducts }
}