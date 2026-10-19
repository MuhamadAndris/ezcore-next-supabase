import { createClient } from "@/lib/client"
import { devError, devLog } from "@/lib/utils"
import { Cart, cartBaseSchema, cartSchema } from "@/schemas/cart.schema"
import { format, isSameDay } from "date-fns"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "@/components/ui/toast"
import { OrderCart } from "@/types/order-cart"

const supabase = createClient()
const userId = 1 // Note: nanti ganti dengan session
type Cartpatch = Partial<Pick<Cart, "storeId" | "purchasedAt">>

export default function useOrderCart() {
    const [cart, setCart] = useState<Cart | null>(null)
    const isUpdatingRef = useRef(false)
    const hasFetchedInitialCartRef = useRef(false)

    const fetchCart = useCallback(async () => {
        if (isUpdatingRef.current) return

        try {
            const { data, error } = await supabase
                .from("carts")
                .select(
                    `
                    id, userId, purchasedAt, storeId, grandTotal,
                    stores (code, name),
                    cartReceipts (
                        id, saleByUserId, totalQty, subTotal, code, 
                        cartReceiptItems(
                            id, qty,
                            products (id, brand, color, size, sku, name, category, subCategory, normalPrice)
                        )
                    )
                `
                )
                .eq("userId", userId)
                .maybeSingle()

            devLog(data)

            if (error) throw error
            if (!data) {
                setCart(null)
                return
            }

            setCart(cartSchema.parse(data))
        } catch (err) {
            toast.add({
                title: "Gagal memuat data keranjang",
                type: "error",
            })
            devError(err)
        } finally {
            isUpdatingRef.current = false
        }
    }, [isUpdatingRef])

    // useEffect(() => {
    //     if (hasFetchedInitialCartRef.current) return
    //     fetchCart()
    //     hasFetchedInitialCartRef.current = true
    // }, [fetchCart])

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
                    updatedAt: new Date().toISOString(),
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
                toast.add({
                    title: "Gagal memperbarui keranjang",
                    type: "error",
                })
                devError(err)
            } finally {
                isUpdatingRef.current = false
            }
        },
        [cart?.id, cart?.storeId, cart?.purchasedAt]
    )

    const updatePurchasedAt = useCallback(
        (date: Date | null) => {
            const current = cart?.purchasedAt ?? null

            if (current === null && date === null) return
            if (current !== null && date !== null && isSameDay(current, date))
                return

            return updateCart({ purchasedAt: date })
        },
        [updateCart, cart?.purchasedAt]
    )

    const updateStoreSelected = useCallback(
        (storeSelected: number | null) => {
            const current = cart?.storeId
            if (current === storeSelected) return

            updateCart({ storeId: storeSelected })
        },
        [updateCart, cart?.storeId]
    )

    const orderCart: OrderCart = {
        data: cart,
        refetch: fetchCart,
        update: updateCart,
        updateStoreSelected,
        updatePurchasedAt,
    }

    return { cart: orderCart }
}
