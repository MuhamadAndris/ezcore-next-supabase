import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import FormBaseProduct from "./form-base-product";
import FormImageProduct from "./form-image-product";
import FormPriceProduct from "./form-price-product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FieldGroup } from "../ui/field";
import { ScrollArea } from "../ui/scroll-area";

interface EditProdukProps extends SheetPrimitive.Root.Props {
    productId: number | null
}

export default function EditProduct({
    productId,
    ...props
}:EditProdukProps) {
    if(!productId) return

    return (
        <Sheet
            {...props}
        >
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Ubah Informasi Produk</SheetTitle>
                    <SheetDescription>psum?</SheetDescription>
                </SheetHeader>            
                <ScrollArea className="flex-1 overflow-y-auto">
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
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}