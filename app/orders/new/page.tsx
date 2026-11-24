"use client"

import CartContent from "@/components/orders/cart"
import NavbarNewOrder from "@/components/orders/navbar-new-order"
import ProductGrid from "@/components/orders/product-grid"
import useProducts from "@/hooks/product/use-products"
import { useEffect, useState } from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import useOrderCart from "@/hooks/order/use-order-cart"

export default function NewOrderPage() {
    // State Produk
    const { products, isLoading, onSearch, refreshData, onFilter } =
        useProducts([])

    // State Cart
    const [showCart, setShowCart] = useState(false)
    const { cart } = useOrderCart()

    useEffect(() => refreshData(), [refreshData])

    return (
        <ResizablePanelGroup className="flex w-full h-full min-h-0 bg-popover">
            <ResizablePanel>
                <div className="flex h-full min-h-0 flex-col">
                    {/* Header */}
                    <NavbarNewOrder
                        isLoading={isLoading}
                        setShowCart={setShowCart}
                        onSearch={onSearch}
                        onFilter={onFilter}
                    />

                    {/* Porodct */}
                    <div className="min-h-0 flex-1 overflow-auto pt-3">
                        <ProductGrid
                            products={products}
                            onAddToCart={(product) => {
                                cart.addCartItem(product)
                            }}
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
                        defaultSize="400px"
                    >
                        <CartContent closeCart={setShowCart} cart={cart} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
    )
}
