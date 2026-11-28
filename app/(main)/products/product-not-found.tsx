"use client"

import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ProductNotFoundProps {
    productId: number
}

export default function ProductNotFound({ productId }: ProductNotFoundProps) {
    const router = useRouter()

    const handleBack = () => {
        router.replace("/products")
    }

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Produk tidak ditemukan</AlertDialogTitle>

                    <AlertDialogDescription>
                        Produk dengan ID: {productId} tidak ditemukan. Silakan
                        kembali ke halaman manajemen produk.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <Button onClick={handleBack}>Kembali</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
