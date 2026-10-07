import { Dispatch } from "react";
import SearchProduct from "../products/search-product";
import { Product } from "@/schemas/product.schema";
import { Badge } from "../ui/badge";
import { ButtonGroup } from "../ui/button-group";

interface NavbarNewOrderProps {
    setProducts: (p:Product[]) => void
}

export default function NavbarNewOrder({
    setProducts
}:NavbarNewOrderProps) {

    return (
        <nav className="flex flex-col gap-2 sticky top-0 bg-background z-100 p-5">
            <SearchProduct setProducts={setProducts} />
            <div className="space-x-2">
                <Badge>Semua</Badge>
                <Badge variant="outline">Tranvel</Badge>
                <Badge variant="outline">Bags</Badge>
                <Badge variant="outline">Acc</Badge>
            </div>
        </nav>
    )
}