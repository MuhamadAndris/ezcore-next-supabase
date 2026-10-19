import z from "zod"
import { storeBaseSchema } from "./store.schema"
import { userBaseSchema } from "./user.schema"
import { productSchema } from "./product.schema"

export const cartBaseSchema = z.object({
    id: z.number().int().nonnegative(),
    userId: z.number(),
    storeId: z.number().nullable(),
    purchasedAt: z.coerce.date().nullable(),
})

const cartReceiptItemSchema = z.object({
    id: z.number().int().nonnegative(),
    qty: z.number().int().nonnegative(),
    products: productSchema,
})

const cartReceiptSchema = z.object({
    id: z.number().int().nonnegative(),
    code: z.string(),
    saleByUserId: z.number().nonnegative().nullable(),
    totalQty: z.number().nonnegative(),
    subTotal: z.number().nonnegative(),
    cartReceiptItems: cartReceiptItemSchema.array().nullable(),
})

export const cartSchema = cartBaseSchema.extend({
    cartReceipts: cartReceiptSchema.array().nullable(),
    grandTotal: z.number().int().nonnegative(),
    stores: z.object({
        code: z.string(),
        name: z.string(),
    }),
})

export type CartReceipt = z.infer<typeof cartReceiptSchema>
export type CartReceiptItem = z.infer<typeof cartReceiptItemSchema>
export type Cart = z.infer<typeof cartSchema>
