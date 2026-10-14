import z, { string } from "zod"

export const storeBaseSchema = z.object({
    id: z.number().int().nonnegative(),
    code: z.string(),
    name: string(),
})

export const storeSchema = storeBaseSchema.extend({
    address: string().nullable(),
})
