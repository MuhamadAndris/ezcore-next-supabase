"use client"

import CartContent from "@/components/orders/cart"
import NavbarNewOrder from "@/components/orders/navbar-new-order"
import ProductGrid from "@/components/orders/product-grid"
import useProducts from "@/hooks/product/use-products"
import { useEffect, useRef, useState } from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import useOrderCart from "@/hooks/order/use-order-cart"

export default function NewOrderPage() {
    const [isLoading, setIsLoading] = useState(true)

    // State Produk
    const { products, replaceProducts, fetchProduct, searchProduct } =
        useProducts([])

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const result = await fetchProduct()
                if (result) replaceProducts(result)
            } finally {
                setIsLoading(false)
            }
        }

        firstLoad()

        return () => {
            replaceProducts([])
        }
    }, [replaceProducts])

    // State Cart
    const [showCart, setShowCart] = useState(false)
    const { cart } = useOrderCart()

    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true
        cart.refetch()
    }, [cart.refetch])

    return (
        <ResizablePanelGroup className="flex w-full h-full min-h-0 bg-popover">
            <ResizablePanel>
                <div className="flex h-full min-h-0 flex-col">
                    {/* Header */}
                    <NavbarNewOrder
                        setShowCart={setShowCart}
                        setIsLoading={setIsLoading}
                        searchProduct={searchProduct}
                    />

                    {/* Porodct */}
                    <div className="min-h-0 flex-1 overflow-auto">
                        <ProductGrid
                            isLoading={isLoading}
                            products={products}
                        />
                    </div>
                </div>
            </ResizablePanel>

            {/* Cart */}
            {showCart && (
                <>
                    <ResizableHandle />

                    <ResizablePanel
                        className="h-full min-h-0 overflow-auto"
                        minSize="320px"
                        defaultSize="320px"
                    >
                        <CartContent cart={cart} closeCart={setShowCart} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
    )
}
