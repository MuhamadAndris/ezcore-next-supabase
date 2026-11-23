import { useRef, useState, useCallback } from "react"

export default function useProductSelection() {
    const productSelectedIds = useRef<Set<number>>(new Set())
    const [onHaveSelected, setOnHaveSelected] = useState(false)

    const handleSelectionChange = useCallback(
        (id: number, checked: boolean) => {
            const ids = productSelectedIds.current

            if (checked) {
                ids.add(id)
            } else {
                ids.delete(id)
            }

            setOnHaveSelected(ids.size > 0)
        },
        []
    )

    return {
        productSelectedIds,
        onHaveSelected,
        handleSelectionChange,
    }
}
