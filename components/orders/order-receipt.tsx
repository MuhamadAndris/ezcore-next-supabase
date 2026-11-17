import { Separator } from "../ui/separator"
import OrderTable from "./order-table"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconChevronRight } from "@tabler/icons-react"

export default function OrderReceipt() {
    const [showItem, setShowItem] = useState(false)

    return (
        <div>
            <div
                className="flex gap-2 justify-between bg-muted p-2 cursor-pointer"
                onClick={() => setShowItem((prev) => !prev)}
            >
                <div className="flex gap-4 items-center">
                    <div>
                        <p className="text-muted-foreground text-xs">
                            NOMOR INVOICE
                        </p>
                        <p className="font-bold text-md">INV-1024-001</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                        <p className="text-muted-foreground text-xs">
                            WAKTU / AGEN
                        </p>
                        <p className="text-md">09:45 • Andi D</p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div>
                        <p className="text-muted-foreground text-xs text-right">
                            TOTAL TRANSAKSI
                        </p>
                        <p className="font-bold text-right text-lg">
                            Rp 9.150.000
                        </p>
                    </div>
                    <IconChevronRight
                        className={cn(
                            "text-muted-foreground transition-all",
                            showItem && "rotate-90"
                        )}
                        size={20}
                    />
                </div>
            </div>

            {showItem && <OrderTable />}
        </div>
    )
}
