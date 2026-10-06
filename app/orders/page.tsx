import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderPage() {
    return (
        <h1>
            <Button>
                <Link href="/orders/new">buat transaksi baru</Link>
            </Button>
        </h1>
    )
}