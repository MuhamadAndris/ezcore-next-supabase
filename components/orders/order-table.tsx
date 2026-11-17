import TableHeaderProducts from "../products/table-header-products"
import { Table, TableBody, TableFooter } from "../ui/table"
import ReceiptFooter from "./receipt-footer"
import OrderTableHeader from "./receipt-header"
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
