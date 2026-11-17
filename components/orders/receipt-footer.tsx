import { TableCell, TableFooter, TableRow } from "../ui/table"
import Image from "next/image"

export default function ReceiptFooter() {
    return (
        <TableFooter>
            <TableRow>
                <TableCell
                    colSpan={4}
                    className="text-muted-foreground text-xs"
                >
                    BUKTI PEMBAYARAN
                </TableCell>
                <TableCell>
                    <div className="relative aspect-square w-15">
                        <Image
                            fill
                            src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                            alt="voja"
                            className="object-contain"
                            sizes="48px"
                        />
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}
