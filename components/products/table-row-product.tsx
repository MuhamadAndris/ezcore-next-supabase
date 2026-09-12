import { Button } from "@/components/ui/button";
import { IconTag, IconPencil } from "@tabler/icons-react";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image"

export default function TableRowProducts() {
    return (
        <TableRow>
            <TableCell className="p-4.25"><Checkbox /></TableCell>
            <TableCell className="flex gap-3 p-3">
                <div className="aspect-square h-10 relative">
                    <Image
                        fill
                        src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                        alt="Product Image"
                        className="object-contain"
                        sizes="48px"
                    />
                </div>
                <div>
                    <p>LOJEL CUBO</p>
                    <p className="text-muted-foreground">971253123 | S | Black</p>
                </div>
            </TableCell>
            <TableCell className="p-3">Kategori 1</TableCell>
            <TableCell className="p-3">100</TableCell>
            <TableCell className="p-3">Rp 100.000</TableCell>
            <TableCell className="p-3">
                <Button variant="outline">
                    <IconTag className="text-[#006575]" />
                    <p className="ml-2">Promo 1</p>
                </Button>
            </TableCell>
            <TableCell className="p-3">
                <Button variant="ghost" size="sm" className="text-[#58423C]">
                    <IconPencil />
                </Button>
            </TableCell>
        </TableRow>
    )
}