import { Dispatch, memo, SetStateAction, useEffect } from "react"
import SearchProduct from "../products/search-product"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { IconArrowLeft, IconShoppingCart } from "@tabler/icons-react"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
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

        const handleShowCart = () => {
            setShowCart((prev) => !prev)

            if (open) setOpen(false)
        }

        useEffect(() => {
            if (open) setShowCart(false)
        }, [open])

        return (
            <nav
                className="
            bg-popover p-5
            flex flex-col gap-2
            sticky top-0 z-10
        "
            >
                <div className="flex justify-between gap-3">
                    <BackButton />
                    <SearchProduct
                        searchProduct={searchProduct}
                        setIsLoading={setIsLoading}
                    />
                    <Button onClick={handleShowCart}>
                        <IconShoppingCart />
                    </Button>
                </div>
                <div className="space-x-2">
                    <Badge>Semua</Badge>
                    <Badge variant="outline">Tranvel</Badge>
                    <Badge variant="outline">Bags</Badge>
                    <Badge variant="outline">Acc</Badge>
                </div>
            </nav>
        )
    }
)

export default NavbarNewOrder
