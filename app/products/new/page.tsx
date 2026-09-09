"use client"

import FormBaseProduct from "@/components/products/form-base-product";
import FormImageProduct from "@/components/products/form-image-product";
import FormPriceProduct from "@/components/products/form-price-product";
import AppBreadcrumb, { AppBreadcrumbMenu } from "@/components/ui/app-breadcrumb";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import Link from "next/link";

const MENUS:AppBreadcrumbMenu[] = [
    {
        label: "Beranda",
        url: "/"
    },
    {
        label: "Katalog Produk",
        url: "/products"
    },
    {
        label: "Produk Baru"
    }
]

export default function NewProductPage() {
    return (
        <div className="max-w-200 mx-auto my-8">
            <div className="mx-6 md:mx-0">
                <AppBreadcrumb menus={MENUS} />

                <h1 className="text-xl md:text-[32px] font-semibold mb-3 md:mb-6 mt-2">Tambah Produk Baru</h1>
            </div>

            <form className="space-y-6">
                {/* informasi dasar */}
                <FormBaseProduct />

                {/* Media / gambar */}
                <FormImageProduct />

                {/* Harga */}
                <FormPriceProduct />

                {/* Footer */}
                <FieldGroup className="border p-6 rounded-md">
                    <div className="flex ml-auto">
                        <Link href="/products" className="mr-2">BATAL</Link>
                        <Button type="submit">SIMPAN</Button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}