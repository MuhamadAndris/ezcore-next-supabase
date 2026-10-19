import { Cart } from "@/schemas/cart.schema"

export interface OrderCart {
    data: Cart | null
    refetch: () => Promise<void>
    update: (
        patch: Partial<Pick<Cart, "storeId" | "purchasedAt">>
    ) => Promise<void> | undefined
    updateStoreSelected: (storeSelected: number | null) => void
    updatePurchasedAt: (date: Date | null) => Promise<void> | undefined
}
