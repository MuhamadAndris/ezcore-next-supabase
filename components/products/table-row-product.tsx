import { Button } from "@/components/ui/button";
import { IconTag, IconPencil, IconTrash } from "@tabler/icons-react";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image"
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

export interface IPromo {
  id: number
  name: string
  discount: number
  start_date: string
  end_date: string
}

export interface IProduct {
  id: number
  sku: string
  brand: string
  name: string
  category: string
  sub_category: string
  color: string
  size: string
  stock: number
  normal_price: number
  promo_price: number
  image_url: string
  promos: IPromo[]
}

export default function TableRowProducts(
    { product } : { product: IProduct}
) {
    return (
        <TableRow className="hover:bg-accent">
            <TableCell className="p-4.25"><Checkbox className="cursor-pointer" /></TableCell>
            <TableCell className="flex gap-3 p-3">
                <div className="aspect-square h-10 relative">
                    <Image
                        fill
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain"
                        sizes="48px"
                    />
                </div>
                <div>
                    <p>{product.name}</p>
                    <p className="text-muted-foreground">{product.sku} | {product.size} | {product.color}</p>
                </div>
            </TableCell>
            <TableCell className="p-3">{product.category}</TableCell>
            <TableCell className="p-3 text-center">{product.stock}</TableCell>

            {/* price */}
            <TableCell className="p-3">
                <div>
                    { product.normal_price !== product.promo_price && 
                        <p className="text-muted-foreground text-xs line-through text-right">
                            {formatNumber(product.normal_price)}
                        </p>
                    }
                    <p className="text-right">
                        {formatNumber(product.promo_price)}
                    </p>
                </div>
            </TableCell>
            
            {/* promo */}
            <TableCell className="p-3">
                {product.promos.map((p) => 
                    <Button key={p.id} variant="outline">
                        <IconTag className="text-[#006575]" />
                        <p className="ml-2">{p.name}</p>
                    </Button>
                )}
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