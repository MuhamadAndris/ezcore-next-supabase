import { createClient } from "@/lib/client"
import { devError } from "@/lib/utils"
import { Cart, cartBaseSchema, cartSchema } from "@/schemas/cart.schema"
import { format } from "date-fns"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

const supabase = createClient()
const userId = 1 // Note: nanti ganti dengan session
type Cartpatch = Partial<Pick<Cart, "storeId" | "purchasedAt">>

export default function useOrderCart() {
    const [cart, setCart] = useState<Cart | null>(null)
    const isUpdatingRef = useRef(false)

    const fetchCart = useCallback(async () => {
        if (isUpdatingRef.current) return

        try {
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
                .eq("userId", userId)
                .maybeSingle()

            if (error) throw error
            if (!data) {
                setCart(null)
                return
            }

            setCart(cartSchema.parse(data))
        } catch (err) {
            toast("Gagal memuat data keranjang")
            devError(err)
        } finally {
            isUpdatingRef.current = false
        }
    }, [])

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    const updateCart = useCallback(
        async (patch: Cartpatch) => {
            if (cart?.id == null || isUpdatingRef.current) return
            if (Object.keys(patch).length === 0) return

            try {
                isUpdatingRef.current = true

                const payload = {
                    ...patch,
                    ...(patch.purchasedAt instanceof Date && {
                        purchasedAt: format(patch.purchasedAt, "yyyy-MM-dd"),
                    }),
                }

                const { data, error } = await supabase
                    .from("carts")
                    .update(payload)
                    .eq("id", cart.id)
                    .select()
                    .single()

                if (error) throw error

                const result = cartBaseSchema.parse(data)
                setCart((prev) =>
                    prev
                        ? {
                              ...prev,
                              ...(patch.storeId !== undefined && {
                                  storeId: result.storeId,
                              }),
                              ...(patch.purchasedAt !== undefined && {
                                  purchasedAt: result.purchasedAt,
                              }),
                          }
                        : prev
                )
            } catch (err) {
                toast("Gagal memperbarui keranjang")
                devError(err)
            } finally {
                isUpdatingRef.current = false
            }
        },
        [cart?.id, cart?.storeId, cart?.purchasedAt]
    )

    return {
        cart,
        refetch: fetchCart,
        updateCart,
    }
}
