import { createClient } from "@/lib/client"
import getStoreUsers from "@/lib/query/user"
import { devError } from "@/lib/utils"
import { useEffect, useState } from "react"

const supabse = createClient()
type StoreUsers = Awaited<ReturnType<typeof getStoreUsers>>

const useStoreUsers = (storeId: number | undefined) => {
    const [users, setUsers] = useState<StoreUsers>([])

    useEffect(() => {
        if (!storeId) return

        let canceld = false

        const load = async (id: number) => {
            try {
                const data = await getStoreUsers(supabse, id)
                if (!canceld) setUsers(data)
            } catch (err) {
                devError(err)
            }
        }

        load(storeId)

        return () => {
            canceld = true
        }
    }, [storeId])

    return { users }
}

export default useStoreUsers
