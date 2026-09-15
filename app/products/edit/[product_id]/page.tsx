import FormBaseProduct from "@/components/products/form-base-product"
import FormImageProduct from "@/components/products/form-image-product"
import FormPriceProduct from "@/components/products/form-price-product"
import AppBreadcrumb, { AppBreadcrumbMenu } from "@/components/ui/app-breadcrumb"
import { FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
        label: "Ubah Produk",
    },
    
]

export default async function ProductUpdatePage(
    { params } : { params: Promise<{ product_id: string}> }
) {
    const { product_id } = await params
    console.log(product_id)

     return (
        <div className="max-w-200 mx-auto my-4 md:my-8">
            <div className="mx-4 md:mx-0">
                <AppBreadcrumb menus={MENUS} />

                <h1 className="text-xl md:text-[32px] font-semibold mb-3 md:mb-6 mt-2">Ubah Produk</h1>
            </div>

            <form className="space-y-6">
                {/* informasi dasar */}
                <FormBaseProduct />

                {/* Media / gambar */}
                <FormImageProduct />

                {/* Harga */}
                <FormPriceProduct />

                {/* Footer */}
                <FieldGroup>
                    <div className="flex gap-5 ml-auto items-center">
                        <Link href="/products">BATAL</Link>
                        <Button type="submit">SIMPAN</Button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}