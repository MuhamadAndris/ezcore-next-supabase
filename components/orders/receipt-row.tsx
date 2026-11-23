import { formatNumber } from "@/lib/utils"
import { TableRow, TableCell } from "../ui/table"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../ui/item"
import Image from "next/image"

export default function ReceiptRow() {
    return (
        <TableRow>
            <TableCell className="p-3 text-center">1</TableCell>
            <TableCell className="p-3">
                <Item>
                    <ItemMedia variant="image">
                        <Image
                            fill
                            src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                            alt="voja"
                            className="object-contain"
                            sizes="48px"
                        />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>LOJEL VOJA</ItemTitle>
                        <ItemDescription>971253 | BLK | S</ItemDescription>
                    </ItemContent>
                </Item>
            </TableCell>
            <TableCell className="p-3">-</TableCell>
            <TableCell className="p-3 text-center">
                <div className="flex gap-1">
                    <span className="bg-primary text-primary-foreground rounded-2xl px-3 text-xs">
                        MEMBER 5%
                    </span>
                    <span className="bg-primary text-primary-foreground rounded-2xl px-3 text-xs">
                        20 + 5%
                    </span>
                </div>
            </TableCell>
            <TableCell className="p-3 text-right">
                {formatNumber(1234)}
            </TableCell>
        </TableRow>
    )
}
