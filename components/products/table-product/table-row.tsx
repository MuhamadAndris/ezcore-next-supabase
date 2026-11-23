import { memo, useState } from "react"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../../ui/item"
import { devLog, formatNumber } from "@/lib/utils"
import { Popover, PopoverTrigger } from "../../ui/popover"
import {
    IconDotsVertical,
    IconSelect,
    IconEdit,
    IconTrash,
} from "@tabler/icons-react"
import { cn } from "cn"
import { PopoverContent } from "../../ui/popover"
import Image from "next/image"
import { Product } from "@/schemas/product.schema"
import { Button } from "../../ui/button"

interface TableRowProps {
    product: Product
}

const TableRow = memo(({ product }: TableRowProps) => {
    devLog("render table row")
    const [selected, setSelected] = useState<number | null>(null)
    const productDesc = [
        product.brand,
        product.name,
        product.color,
        product.size,
    ].join(" ")
    return (
        <Item
            key={product.id}
            className={cn(
                "flex-nowrap",
                selected === product.id ? "bg-muted" : "hover:bg-muted"
            )}
        >
            <ItemMedia variant="image" className="relative">
                <Image
                    alt="dumy product"
                    src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                    fill
                    sizes="50px"
                />
            </ItemMedia>
            <ItemContent className="min-w-0 flex-1">
                <ItemTitle className="max-w-[70%] ">
                    <p className="truncate">{productDesc}</p>
                </ItemTitle>
                <ItemDescription>
                    Rp. {formatNumber(product.normalPrice)} /pcs
                </ItemDescription>
            </ItemContent>
            <ItemActions className="shrink-0">
                <Popover
                    open={selected === product.id}
                    onOpenChange={(open) =>
                        setSelected(open ? product.id : null)
                    }
                >
                    <PopoverTrigger
                        render={
                            <Button
                                variant="ghost"
                                className="text-muted-foreground"
                            >
                                <IconDotsVertical />
                            </Button>
                        }
                    />
                    <PopoverContent className="gap-1" align="end">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start"
                        >
                            <IconSelect />
                            <span>Pilih</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start"
                        >
                            <IconEdit />
                            <span>Ubah</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-destructive hover:text-destructive"
                        >
                            <IconTrash />
                            <span>Hapus</span>
                        </Button>
                    </PopoverContent>
                </Popover>
            </ItemActions>
        </Item>
    )
})

TableRow.displayName = "TableRow"

export default TableRow
