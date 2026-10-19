import { IconSearch } from "@tabler/icons-react"
import { memo, useEffect, useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { devLog } from "@/lib/utils"

interface SearchProductProps {
    searchProduct: (keyword: string) => Promise<void>
    setIsLoading: (v: boolean) => void
}

const DEBOUNCE_DELAY = 800

const SearchProduct = memo(
    ({ searchProduct, setIsLoading }: SearchProductProps) => {
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

        return (
            <InputGroup>
                <InputGroupInput
                    placeholder="Cari SKU atau nama produk..."
                    value={searchValue}
                    onChange={handleSearch}
                    type="search"
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
