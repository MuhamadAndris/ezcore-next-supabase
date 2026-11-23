import { useEffect, useRef, useState } from "react"

export function useMinimumLoading(isLoading: boolean, minMs = 500) {
    const [visible, setVisible] = useState(false)
    const startRef = useRef(0)

    useEffect(() => {
        if (isLoading) {
            startRef.current = Date.now()
            const t = setTimeout(() => setVisible(true), 0)
            return () => clearTimeout(t)
        }

        const elapsed = Date.now() - startRef.current
        const remaining = Math.max(0, minMs - elapsed)
        const t = setTimeout(() => setVisible(false), remaining)
        return () => clearTimeout(t)
    }, [isLoading, minMs])

    return visible
}
