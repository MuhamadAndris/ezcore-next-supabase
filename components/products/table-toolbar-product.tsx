import LINK from "@/const/LINK";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import SearchProduct from "./search-product";
import TableFilter from "./table-filter";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/schemas/product.schema";

interface ToolbarProps {
    setProducts: (p: Product[]) => void
}

export default function Toolbar({
    setProducts
}:ToolbarProps) {
    return (
        <div className="sticky top-0 bg-background z-10 p-4 flex gap-4 items-center justify-between border-b rounded-t-md">
            <div className="flex-1 flex gap-4 items-center">
            
                {/* search input */}
                <SearchProduct setProducts={setProducts} />

                {/* filter */}
                <TableFilter />
            </div>

            {/* Add product btn */}
            <Link
                href={LINK.NEW_PRODUCT}
                className="
                    bg-primary
                    hover:bg-primary/90
                    text-primary-foreground
                    px-2 md:px-4 py-1 md:py-2
                    rounded-md
                    truncate
                    flex gap-3
                ">
                <IconPlus />
                <span className="hidden md:inline">Tambah Produk</span>
            </Link>
        </div>
    )
}