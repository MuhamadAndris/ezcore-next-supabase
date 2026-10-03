import { Checkbox } from "../ui/checkbox";
import { TableHead, TableHeader, TableRow } from "../ui/table";

export default function TableHeaderProducts() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="text-muted-foreground p-4.25"><Checkbox className="cursor-pointer" /></TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">#</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">DESKRIPSI PRODUK</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">KATEGORI</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25 text-center">STOCK</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25 text-right">HARGA</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">PROMO</TableHead>
                <TableHead className="text-muted-foreground px-3 py-4.25">AKSI</TableHead>
            </TableRow>
        </TableHeader>
    )
}