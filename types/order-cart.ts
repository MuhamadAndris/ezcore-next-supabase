import { Product } from "@/schemas/product.schema"

type items = {
    value: number
    label: string
}

export type CartItem = {
    product: Product
    qty: number
}

export type CartReceipts = {
    no: number
    saleByUser: items
    CartItems: CartItem[]
    totalQty: number
    subTotal: number
    paymentProof: File | null
}

export type CartData = {
    userId: number
    storeSelected: items
    purchasedAt: Date
    grandTotal: number
    totalQty: number
}
