import { Table, TableBody } from "../ui/table"
import ReceiptFooter from "./receipt-footer"
import ReceiptRow from "./receipt-row"

export default function OrderTable() {
    return (
        <Table>
            {/* <OrderTableHeader /> */}
            <TableBody>
                <ReceiptRow />
                <ReceiptRow />
            </TableBody>
            <ReceiptFooter />
        </Table>
    )
}
