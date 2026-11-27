"use client"

import OrderLists from "@/components/orders/list-order/order-list"
import AppHeader from "@/components/ui/app-header"
import { Button } from "@/components/ui/button"

import { IconPlus } from "@tabler/icons-react"
import Link from "next/link"

export default function orderPage() {
    return (
        <section className="w-full">
            <AppHeader title="Riwayat Transaksi">
                <Link href="/orders/new">
                    <Button>
                        <IconPlus />
                        Buat Order
                    </Button>
                </Link>
            </AppHeader>

            <div className="p-4 space-y-6">
                <OrderLists />
                <OrderLists />
            </div>
        </section>
    )
}
