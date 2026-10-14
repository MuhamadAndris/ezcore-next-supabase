import z from "zod"

export const userBaseSchema = z.object({
    id: z.number().nonnegative(),
    code: z.string(),
    name: z.string(),
})

export const userSchema = userBaseSchema.extend({
    title: z.string(),
    role: z.string(),
})
