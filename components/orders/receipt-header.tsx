import { TableHead, TableHeader, TableRow } from "../ui/table"
import { cn } from "@/lib/utils"

const ReceiptHeader = () => {
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
}

export default ReceiptHeader
