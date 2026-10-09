import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
        <Link href="orders/new">
          <Button>Tambah Transaksi</Button>
        </Link>
      
        <Link href="products">
          <Button>Manage Produk</Button>
        </Link>
    </>
  )
}