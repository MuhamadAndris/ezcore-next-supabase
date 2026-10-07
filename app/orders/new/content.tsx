"use client"

import CartContent from "@/components/orders/cart-content";
import NavbarNewOrder from "@/components/orders/navbar-new-order";
import ProductGirid from "@/components/orders/product-grid";
import useProducts from "@/hooks/product/use-products";
import { Product } from "@/schemas/product.schema";

interface NewOrderContentProps {
    defaultProduct: Product[]
}

export default function NewOrderContent({
    defaultProduct
}:NewOrderContentProps) {
    const { products, replaceProducts } = useProducts(defaultProduct)

    return (
        <section className="flex w-full h-full container mx-auto">
            <div className="flex flex-col flex-1">
                <NavbarNewOrder setProducts={replaceProducts} />
                <ProductGirid products={products} />
            </div>

            {/* <CartContent /> */}
        </section>
    )
}