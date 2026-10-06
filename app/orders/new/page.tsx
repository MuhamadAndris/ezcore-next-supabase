"use client"

import CartContent from "@/components/orders/cart-content";
import NavbarNewOrder from "@/components/orders/navbar-new-order";
import ProductGirid from "@/components/orders/product-grid";
import useProducts from "@/hooks/product/use-products";

export default function NewOrderPage() {
    const { products, replaceProducts } = useProducts([])

    return (
        <section className="flex w-full h-full container mx-auto">
            <div className="flex flex-col flex-1">
                <NavbarNewOrder setProducts={replaceProducts} />
                <ProductGirid products={products} />
            </div>

            <CartContent />
        </section>
    )
}