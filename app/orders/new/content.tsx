"use client"

import CartContent from "@/components/orders/cart-content";
import NavbarNewOrder from "@/components/orders/navbar-new-order";
import ProductGirid from "@/components/orders/product-grid";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useProducts from "@/hooks/product/use-products";
import { Product } from "@/schemas/product.schema";
import { useState } from "react";

interface NewOrderContentProps {
    defaultProduct: Product[]
}

export default function NewOrderContent({
    defaultProduct
}:NewOrderContentProps) {
    const { products, replaceProducts } = useProducts(defaultProduct)
    const [ showCart, setShowCart ] = useState(true)

    return (
        <section className="grid grid-cols-[1fr_auto] h-screen overflow-auto gap-1 container mx-auto">
            <div className="grid grid-rows-[auto_1fr] min-h-0">
                <NavbarNewOrder
                    setProducts={replaceProducts}
                    setShowCart={setShowCart}
                />
                <div className="min-h-0 overflow-y-auto">
                    <ProductGirid products={products} />
                </div>
            </div>

            {/* Cart for Desktop */}
            { showCart &&
                <div className="min-h-0 h-full">
                    <CartContent closeCart={setShowCart} />
                </div>
            }
        </section>
    )
}