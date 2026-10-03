import z from "zod";

export const productSchema = z.object({
  id: z.number().int().nonnegative(),
  sku: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  color: z.string().nullable(),
  size: z.string().nullable(),
  normal_price: z.number().int().nonnegative(),
  category: z.string(),
  sub_category: z.string(),
});

export type Product = z.infer<typeof productSchema>;