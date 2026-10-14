import { createClient } from "@/lib/client"
import { devError, devLog } from "@/lib/utils"
import { cartSchema } from "@/schemas/cart.schema"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export default function useOrderCart() {
    const [isLoading, setIsLoading] = useState(false)
    const [storeSelected, setStoreSelected] = useState<string | null>(null)
    const [purchasedAt, setPurchasedAt] = useState<Date | null | undefined>(
        null
    )
    const [grandTotal, setGrandTotal] = useState<number | null>(null)

    const fetchCart = useCallback(async () => {
        if (isLoading) return

        setIsLoading(true)

        const supabase = createClient()
        const { data, error } = await supabase
            .from("carts")
            .select(
                `
                id,
                userId,
                purchasedAt,
                storeId,
                grandTotal,
                users (id, code, name, title),
                stores (id, code, name)
            `
            )
            .eq("userId", 1)
            .maybeSingle()

        if (error) {
            toast.error("Gagal memuat data keranjang")
            devError(error)
            setIsLoading(false)
            return
        }

        if (!data) {
            setIsLoading(false)
            devLog("Data tidak ada: " + data)
            return
        }

        const parsed = cartSchema.safeParse(data ?? [])

        if (parsed.error) {
            devError(parsed.error)
            setIsLoading(false)
            return
        }

        const result = parsed.data

        setStoreSelected(result.stores?.code ?? null)
        setPurchasedAt(result.purchasedAt)
        setGrandTotal(result.grandTotal)

        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    return {
        refetch: fetchCart,
        storeSelected,
        setStoreSelected,
        purchasedAt,
        setPurchasedAt,
        setGrandTotal,
        grandTotal,
    }
}
