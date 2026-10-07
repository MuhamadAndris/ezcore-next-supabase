import { productSchema } from "@/schemas/product.schema";
import { createClient } from "../server";

export default async function getProduct() {
    const supabase = await createClient();
        
    const { data, error } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(0, 14);

    if (error) console.error(error)
        
    const parsed = productSchema.array().safeParse(data ?? [])
    
    if(!parsed.success) {
        console.error(parsed.error)
    }

    const products = parsed.success ? parsed.data : []

    return products
}