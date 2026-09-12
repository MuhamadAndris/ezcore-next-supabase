import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { IconSearch } from "@tabler/icons-react";
import TableFilter from "./table-filter";
import TableHeaderProducts from "./table-header-products";
import TableRowProducts from "./table-row-product";

export default function TableProducts() {
    return (
        <div className="border">
            <div className="m-4 flex items-center gap-4">
                {/* search */}
                <div className="relative flex items-center">
                    <IconSearch className="absolute left-2 text-muted-foreground" />
                    <Input
                        placeholder="Cari SKU atau nama produk..."
                        className="md:w-[320px] h-10 pl-10"
                    />
                </div>

                {/* filter */}
                <TableFilter />
            </div>

            <Table>
                <TableHeaderProducts />
                <TableBody>

                    <TableRowProducts />
                    <TableRowProducts />
                    <TableRowProducts />
                    <TableRowProducts />
                    <TableRowProducts />
                    <TableRowProducts />
                    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7} className="p-4.25">
                            <div className="flex justify-between items-center">
                                <p className="text-muted-foreground">Menampilkan 1-10 dari 100 produk</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Sebelumnya</Button>
                                    <Button variant="outline" size="sm">Berikutnya</Button>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}