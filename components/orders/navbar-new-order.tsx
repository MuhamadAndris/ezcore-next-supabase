import { Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { IconShoppingCart } from "@tabler/icons-react"
import { useSidebar } from "../ui/sidebar"
import BackButton from "../ui/back-button"
import { SearchButton, SearchInput } from "../ui/search"
import { devLog } from "@/lib/utils"

interface NavbarNewOrderProps {
    setShowCart: Dispatch<SetStateAction<boolean>>
    onSearch: (keyword: string) => Promise<void>
    isLoading: boolean
}

const NavbarNewOrder = memo(
    ({ setShowCart, onSearch, isLoading }: NavbarNewOrderProps) => {
        devLog("render navbar")
        const { open, setOpen } = useSidebar()
        const [showSearchInput, setShowSearchInput] = useState(true)

        const handleShowCart = () => {
            setShowCart((prev) => !prev)

            if (open) setOpen(false)
        }

        useEffect(() => {
            if (open) setShowCart(false)
        }, [open, setShowCart])

        return (
            <nav
                className="
            bg-popover py-2 pr-2
            flex flex-col gap-2
            sticky top-0 z-10
        "
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 flex items-center">
                        <BackButton />
                        {showSearchInput ? (
                            <SearchInput
                                isLoading={isLoading}
                                placeholder="Cari SKU atau nama produk..."
                                onSearch={onSearch}
                                onClose={() => setShowSearchInput(false)}
                            />
                        ) : (
                            <h2 className="font-bold text-lg">Buat Order</h2>
                        )}
                    </div>
                    <div>
                        <SearchButton
                            isSearchOpen={showSearchInput}
                            onClick={() => setShowSearchInput((prev) => !prev)}
                        />
                        <Button onClick={handleShowCart} className="relative">
                            <IconShoppingCart />
                            <span className="absolute -top-2 -right-1 bg-secondary rounded-full text-xs aspect-square w-5 flex justify-center items-center">
                                2
                            </span>
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
)

NavbarNewOrder.displayName = "NavbarNewOrder"

export default NavbarNewOrder
