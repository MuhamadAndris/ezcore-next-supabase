import { Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { TableHead, TableHeader, TableRow } from "../ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { IconChevronDown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const ReceiptHeader = memo(() => {
    return (
        <TableHeader>
            <TableRow>
                {/* } */}
                <TableHead className="text-muted-foreground p-2 text-xs text-center">
                    #
                </TableHead>
                {/* { columns.map((col) =>  */}
                <TableHead className={cn("text-muted-foreground p-2 text-xs")}>
                    DETAIL PRODUK
                </TableHead>
                <TableHead className={cn("text-muted-foreground p-2 text-xs")}>
                    PROMO
                </TableHead>
                <TableHead
                    className={cn(
                        "text-muted-foreground p-2 text-xs text-center"
                    )}
                >
                    QTY
                </TableHead>
                <TableHead
                    className={cn(
                        "text-muted-foreground p-2 text-xs text-right"
                    )}
                >
                    HARGA
                </TableHead>
            </TableRow>
        </TableHeader>
    )
})

export default ReceiptHeader
