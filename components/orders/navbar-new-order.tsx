import { Dispatch } from "react";
import SearchProduct from "../products/search-product";
import { Product } from "@/schemas/product.schema";

interface NavbarNewOrderProps {
    setProducts: (p:Product[]) => void
}

export default function NavbarNewOrder({
    setProducts
}:NavbarNewOrderProps) {

    return (
        <nav className="h-10 bg-yellow-50">
            <SearchProduct setProducts={setProducts} />
        </nav>
    )
}