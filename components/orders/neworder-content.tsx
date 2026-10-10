"use client"

import Cart from "@/components/orders/cart";
import NavbarNewOrder from "@/components/orders/navbar-new-order";
import ProductGirid from "@/components/orders/product-grid";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useProducts from "@/hooks/product/use-products";
import { cn } from "@/lib/utils";
import { Product } from "@/schemas/product.schema";
import { Activity, useState } from "react";

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
            {/* NOTE SELANJUTNYA BUTA HOOK UNTUKK AMBIL AMBIL DAN KELOLA DATA UNTUK DI CART */}

            {/* Cart */}
            <Activity mode={showCart ? "visible" : "hidden"}>
                <Cart closeCart={setShowCart} />
            </Activity>
        </section>
    )
}