import { useRef, useState, useCallback } from "react"

export default function useProductSelection() {
    const productSelectedIds = useRef<Set<number>>(new Set())
    
    const [ onHaveSelected, setOnHaveSelected ] = useState(false)
    const handleSelectionChange = useCallback((id:number, checked:boolean) => {
        checked
            ? productSelectedIds.current.add(id)
            : productSelectedIds.current.delete(id)
        
        setOnHaveSelected(productSelectedIds.current.size > 0)
    }, [])

    return {
        productSelectedIds,
        onHaveSelected,
        handleSelectionChange
    }
}