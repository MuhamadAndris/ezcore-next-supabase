import z from "zod"
import { storeBaseSchema } from "./store.schema"
import { userBaseSchema } from "./user.schema"

export const cartBaseSchema = z.object({
    id: z.number().int().nonnegative(),
    userId: z.number(),
    storeId: z.number().nullable(),
    purchasedAt: z.coerce.date().nullable(),
})

export const cartSchema = cartBaseSchema.extend({
    stores: storeBaseSchema.nullable(),
    users: userBaseSchema,
    grandTotal: z.number().int().nonnegative(),
})

export type Cart = z.infer<typeof cartSchema>
