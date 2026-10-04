import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface TableHeaderProductsProps {
    setOnSelectedAll: (v:boolean) => void
    onHaveSelected: boolean
}

export default function TableHeaderProducts({
    onHaveSelected,
    setOnSelectedAll
}:TableHeaderProductsProps) {
    const [ onSelected, setOnSelected ] = useState<boolean>(false)

    useEffect(() => {
        setOnSelectedAll(onSelected)
    }, [onSelected])

    return (
        <TableHeader>
            <TableRow>
                { onHaveSelected &&
                    <TableHead className="text-muted-foreground p-4.25">
                        <Checkbox
                            checked={onSelected}
                            onCheckedChange={(checked) => setOnSelected(!!checked)}
                            className="cursor-pointer"
                        />
                    </TableHead>
                }
                <TableHead className="text-muted-foreground px-3 py-4.25 text-center">#</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25 text-center">GAMBAR</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">DESKRIPSI PRODUK</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">KATEGORI</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25 text-center">STOCK</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25 text-right">HARGA</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">PROMO</TableHead>
                <TableHead className="text-muted-foreground py-4.25"></TableHead>
            </TableRow>
        </TableHeader>
    )
}