import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { ColumnVisible } from "./table-products";
import { cn } from "@/lib/utils";

interface TableHeaderProductsProps {
    onHaveSelected: boolean
    columns: ColumnVisible[]
    setOnSelectedAll: (v:boolean) => void
    setColumns: Dispatch<SetStateAction<ColumnVisible[]>>
}

const TableHeaderProducts = memo(({
    columns,
    onHaveSelected,
    setOnSelectedAll,
    setColumns,
}:TableHeaderProductsProps) => {
    console.log("render - header product table")

    const [ onSelected, setOnSelected ] = useState<boolean>(false)

    useEffect(() => {
        setOnSelectedAll(onSelected)
    }, [onSelected])

    const handleCheckedChange = (column: ColumnVisible, checked: boolean) => {
        setColumns((prev) => 
            prev.map((old) => {
                return old.label === column.label
                    ? { ...old, isVisible: checked }
                    : old
            })
        )
    }

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

                { columns.map((col) => 
                    col.isVisible && 
                     <TableHead key={col.label} className={cn("text-muted-foreground px-3 py-4.25", col.align)}>{col.label}</TableHead>
                )}


                <TableHead className="text-muted-foreground py-4.25">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="ghost">
                                <IconChevronDown />
                            </Button>
                        }/>

                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Tampilan Kolom</DropdownMenuLabel>
                                { columns.map((col) => 
                                    <DropdownMenuCheckboxItem
                                        key={col.label}
                                        checked={col.isVisible}
                                        className="capitalize"
                                        onCheckedChange={(checked) => handleCheckedChange(col, checked)}
                                    >
                                        {col.label.toLowerCase()}
                                    </DropdownMenuCheckboxItem>
                                )}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableHead>
            </TableRow>
        </TableHeader>
    )
})

export default TableHeaderProducts