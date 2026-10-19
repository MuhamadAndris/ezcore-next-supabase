import { toast } from "@/components/ui/toast"
import { createClient } from "@/lib/client"
import { getUserStores } from "@/lib/query/store"
import { devError } from "@/lib/utils"
import { useEffect, useState } from "react"

const supabase = createClient()

type UserStores = Awaited<ReturnType<typeof getUserStores>>

const useUserStores = (userId: number | undefined) => {
    const [stores, setStores] = useState<UserStores>([])

    useEffect(() => {
        if (!userId) return

        let cancelled = false

        async function load(id: number) {
            try {
                const data = await getUserStores(supabase, id)
                if (!cancelled) setStores(data)
            } catch (err) {
                devError(err)
                toast.add({
                    type: "error",
                    description: "Gagal ambil list toko",
                })
            }
        }

        load(userId)

        return () => {
            cancelled = true
        }
    }, [userId])

    return { stores }
}

export default useUserStores
