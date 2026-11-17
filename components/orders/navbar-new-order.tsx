import { Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import SearchProduct from "../products/search-product"
import { Button } from "../ui/button"
import { IconSearch, IconShoppingCart } from "@tabler/icons-react"
import { useSidebar } from "../ui/sidebar"
import BackButton from "../ui/back-button"

interface NavbarNewOrderProps {
    setShowCart: Dispatch<SetStateAction<boolean>>
    searchProduct: (keyword: string) => Promise<void>
    setIsLoading: (v: boolean) => void
}

const NavbarNewOrder = memo(
    ({ setShowCart, searchProduct, setIsLoading }: NavbarNewOrderProps) => {
        console.log("render navbar")
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
                        <SearchProduct
                            searchProduct={searchProduct}
                            setIsLoading={setIsLoading}
                            setShow={setShowSearchInput}
                            show={showSearchInput}
                        />
                        {!showSearchInput && (
                            <h2 className="font-bold text-lg">Buat Order</h2>
                        )}
                    </div>
                    <div>
                        {!showSearchInput && (
                            <Button
                                variant="ghost"
                                className="mr-1"
                                onClick={() => setShowSearchInput(true)}
                            >
                                <IconSearch />
                            </Button>
                        )}
                        <Button onClick={handleShowCart} className="relative">
                            {/* <div className="relative"> */}
                            <IconShoppingCart />
                            <span className="absolute -top-2 -right-1 bg-secondary rounded-full text-xs aspect-square w-5 flex justify-center items-center">
                                2
                            </span>
                            {/* </div> */}
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
)

export default NavbarNewOrder
