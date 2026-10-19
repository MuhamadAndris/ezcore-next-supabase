import { SupabaseClient } from "@supabase/supabase-js"

export const getUserStores = async (
    supabase: SupabaseClient,
    userId: number
) => {
    const { data, error } = await supabase
        .from("userStores")
        .select(`stores (id, name)`)
        .eq("userId", userId)

    if (error) throw error

    return data.flatMap((row) => {
        const store = row.stores as unknown as {
            id: number
            name: string
        } | null
        return store ? [{ value: store.id, label: store.name }] : []
    })
}
