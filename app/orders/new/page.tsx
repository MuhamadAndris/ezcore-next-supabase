import { productSchema } from "@/schemas/product.schema";
import NewOrderContent from "../../../components/orders/neworder-content";
import { createClient } from "@/lib/server"

export default async function NewOrderPage() {
    const supabase = await createClient()

    const { data, error} = await supabase
        .from("products")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", {ascending:false})
        .limit(14)

    if(error) console.error(error)

    const product = productSchema.array().parse(data)
    
    return <NewOrderContent defaultProduct={product} />
}