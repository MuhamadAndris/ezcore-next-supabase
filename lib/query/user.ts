import { SupabaseClient } from "@supabase/supabase-js"

const getStoreUsers = async (supabse: SupabaseClient, storeId: number) => {
    const { data, error } = await supabse
        .from("userStores")
        .select("users(id, name)")
        .eq("storeId", storeId)

    if (error) throw error

    return data.flatMap((row) => {
        const user = row.users as unknown as { id: number; name: string }
        return user ? [{ value: user.id, label: user.name }] : []
    })
}

export default getStoreUsers
