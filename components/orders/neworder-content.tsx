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
    const [ showCart, setShowCart ] = useState(false)

    return (
        <section className="
            fixed w-full h-full min-h-0
            grid gap-1 grid-cols-[1fr_auto]
            xl:container inset-x-0 mx-auto">
            <div className="min-h-0 overflow-auto">
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