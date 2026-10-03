import { Button } from "@/components/ui/button";
import { IconTag, IconPencil, IconTrash, IconLuggage } from "@tabler/icons-react";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image"
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/schemas/product.schema";

interface TableRowProductsProps {
    product: Product
    index?: number
}

export default function TableRowProducts({
    product, index 
} : TableRowProductsProps) {
    return (
        <TableRow className="hover:bg-accent">
            <TableCell className="p-4.25"><Checkbox className="cursor-pointer" /></TableCell>
            <TableCell className="p-3 text-center">{index !== undefined ? index + 1 : '-'}</TableCell>
            <TableCell className="flex gap-3 p-3">
                <div className="aspect-square h-10 relative">
                    {/* <Image
                        fill
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain"
                        sizes="48px"
                    /> */}
                </div>
                <div>
                    <p>{product.name}</p>
                    <p className="text-muted-foreground">
                        {product.sku}
                        {/* NOTE: SELANJUTANYA BUAT AGAR FITUR MEBAMPILKAN DATANYA PER PAGE */}
                        {product.size && ` | ${product.size}` }
                        {product.color && ` | ${product.color}` }

                    </p>
                </div>
            </TableCell>
            <TableCell className="p-3">{product.category}</TableCell>
            <TableCell className="p-3 text-center">0</TableCell>

            {/* price */}
            <TableCell className="p-3">
                <div>
                    {/* { product.normal_price !== product.promo_price && 
                        <p className="text-muted-foreground text-xs line-through text-right">
                            {formatNumber(product.normal_price)}
                        </p>
                    } */}
                    <p className="text-right">
                        {formatNumber(product.normal_price)}
                    </p>
                </div>
            </TableCell>
            
            {/* promo */}
            <TableCell className="p-3">
                {/* {product.promos.map((p) => 
                    <Button key={p.id} variant="outline">
                        <IconTag className="text-[#006575]" />
                        <p className="ml-2">{p.name}</p>
                    </Button>
                )} */}
            </TableCell>

            {/* Action */}
            <TableCell className="p-3">
                <Link href={`/products/edit/${product.id}`}>
                    <Button variant="ghost">
                        <IconPencil />
                    </Button>
                </Link>
                <Button variant="destructive" className="bg-transparent">
                    <IconTrash />
                </Button>
            </TableCell>
        </TableRow>
    )
}