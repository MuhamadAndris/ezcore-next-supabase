import { Button } from "@/components/ui/button";
import { IconTag, IconPencil, IconTrash, IconLuggage, IconDotsVertical } from "@tabler/icons-react";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image"
import { cn, formatNumber } from "@/lib/utils";
import { Product } from "@/schemas/product.schema";
import { Dispatch, memo, RefObject, SetStateAction, use, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ColumnVisible } from "./table-products";

interface TableRowProductsProps {
    product: Product
    index: number
    onHaveSelected: boolean
    onSelectedAll: boolean
    columns: ColumnVisible[]
    onSelectionChange: (id: number, checked: boolean) => void
}

const TableRowProducts = memo(({
    product,
    index,
    columns,
    onHaveSelected,
    onSelectedAll,
    onSelectionChange
} : TableRowProductsProps) => {
    console.log("render - table row")

    const [ onSelected, setOnSelected ] = useState<boolean>(false)

    const handleSelectProduct = (checked: boolean) => {
        setOnSelected(checked)

        onSelectionChange(product.id, checked)
    }
    
    useEffect(() => {
        handleSelectProduct(onSelectedAll)
    }, [onSelectedAll])

    return (
        <TableRow
            onClick={() => {
                if(onHaveSelected) handleSelectProduct(!onSelected)
            }}

            className={cn(
                "hover:bg-accent",
                onSelected && "bg-accent",
                onHaveSelected && "cursor-pointer"
            )}
        >

            {/* Checkbox */}
            { onHaveSelected &&
                <TableCell className="p-4.25">
                    <Checkbox
                        className="cursor-pointer"
                        checked={onSelected}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={(checked) => handleSelectProduct(!!checked)}
                    />
                </TableCell>
            }

            {/* index */}
            <TableCell className="p-3 text-center">{index !== undefined ? index + 1 : '-'}</TableCell>

            {/* Image */}
            { columns[0].isVisible &&
                <TableCell className="p-3">
                    <div className="aspect-square h-10 relative mx-auto">
                        <Image
                            fill
                            src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                            alt="voja"
                            className="object-contain"
                            sizes="48px"
                        />
                    </div>
                </TableCell>
            }

            {/* Description */}
            { columns[1].isVisible &&
                <TableCell className="flex gap-3 p-3">
                    <div>
                        <p>{product.name}</p>
                        <p className="text-muted-foreground">
                            {product.sku}
                            {product.size && ` | ${product.size}` }
                            {product.color && ` | ${product.color}` }

                        </p>
                    </div>
                </TableCell>
            }

            {/* category */}
            { columns[2].isVisible &&
                <TableCell className="p-3">{product.category}</TableCell>
            }

            {/* stock */}
            { columns[3].isVisible &&
                <TableCell className="p-3 text-center">0</TableCell>
            }

            {/* price */}
            { columns[4].isVisible &&
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
            }

            {/* promo */}
            { columns[5].isVisible &&
                <TableCell className="p-3">
                    {/* {product.promos.map((p) => 
                        <Button key={p.id} variant="outline">
                            <IconTag className="text-[#006575]" />
                            <p className="ml-2">{p.name}</p>
                        </Button>
                    )} */}
                </TableCell>
            }
            
            {/* Action */}
            {/* <TableCell className="p-3">
                <Link href={`/products/edit/${product.id}`}>
                    <Button variant="ghost">
                        <IconPencil />
                    </Button>
                </Link>
                <Button variant="destructive" className="bg-transparent">
                    <IconTrash />
                </Button>
            </TableCell> */}
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger 
                        render={
                            <Button variant="ghost" className="cursor-pointer">
                                <IconDotsVertical />
                            </Button>
                        }
                        onClick={(e) => e.stopPropagation()}
                    />

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            handleSelectProduct(true)
                        }}>
                            Pilih
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
})

export default TableRowProducts