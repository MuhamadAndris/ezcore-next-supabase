import { useEffect, useSyncExternalStore } from "react"
import { getTotalProdutQuery } from "@/lib/query/product"
import { toast } from "@/components/ui/toast"

let cachedTotal: number | null = null
let inflight: Promise<void> | null = null
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((l) => l())

function subscribe(cb: () => void) {
    listeners.add(cb)
    return () => {
        listeners.delete(cb)
    }
}

const getSnapshot = () => cachedTotal ?? 0
const getServerSnapshot = () => 0

export function invalidateTotalProducts() {
    cachedTotal = null
    emit()
}

export default function useTotalProducts() {
    const total = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    useEffect(() => {
        if (cachedTotal !== null || inflight) return

        inflight = getTotalProdutQuery()
            .then((result) => {
                cachedTotal = result
                emit()
            })
            .catch(() => {
                toast.add({ type: "error", title: "Gagal ambil total produk" })
            })
            .finally(() => {
                inflight = null
            })
    }, [])

    return total
}
