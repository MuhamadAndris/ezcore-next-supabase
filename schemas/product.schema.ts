import z from "zod"

export const productSchema = z.object({
    id: z.number().int().nonnegative(),
    sku: z.string().min(1),
    name: z.string().min(1),
    brand: z.string().min(1),
    color: z.string().nullable(),
    size: z.string().nullable(),
    normalPrice: z.number().int().nonnegative(),
    category: z.string(),
    subCategory: z.string(),
})

export const productFilterSchema = productSchema
    .pick({ category: true, brand: true })
    .partial()

export type ProductFilter = z.infer<typeof productFilterSchema>
export type Product = z.infer<typeof productSchema>
