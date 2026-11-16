import { memo, useEffect, useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { devLog } from "@/lib/utils"
import { IconSearch } from "@tabler/icons-react"

interface SearchProductProps {
    searchProduct: (keyword: string) => Promise<void>
    setIsLoading: (v: boolean) => void
    setShow?: (v: boolean) => void
    show?: boolean
}

const DEBOUNCE_DELAY = 800

const SearchProduct = memo(
    ({ searchProduct, setIsLoading, setShow, show }: SearchProductProps) => {
        devLog("render - Search product")

        const [searchValue, setSearchValue] = useState("")

        useEffect(() => {
            const keyword = searchValue.trim()

            if (!keyword) return

            const timeout = setTimeout(async () => {
                setIsLoading(true)

                try {
                    await searchProduct(keyword)
                } finally {
                    setIsLoading(false)
                }
            }, DEBOUNCE_DELAY)

            return () => clearTimeout(timeout)
        }, [searchValue, searchProduct, setIsLoading])

        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
        }

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const nextTarget = e.relatedTarget as HTMLElement | null

            if (nextTarget?.closest("[data-search-trigger]")) {
                return
            }

            setShow?.(false)
        }

        if (!show) return null

        return (
            <InputGroup>
                <InputGroupInput
                    placeholder="Cari SKU atau nama produk..."
                    value={searchValue}
                    onChange={handleSearch}
                    type="search"
                    autoFocus
                    onBlur={handleBlur}
                />

                <InputGroupAddon>
                    <IconSearch />
                </InputGroupAddon>
            </InputGroup>
        )
    }
)

SearchProduct.displayName = "SearchProduct"

export default SearchProduct
