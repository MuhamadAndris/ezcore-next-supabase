"use client"

import FormBaseProduct from "@/components/products/formBaseProduct";
import FormImageProduct from "@/components/products/formImageProduct";
import FormPriceProduct from "@/components/products/formPriceProduct";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconCameraPlus, IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="max-w-200 mx-auto my-8">
            <div className="mx-6 md:mx-0">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-xs md:text-sm"
                                render={
                                <Link href="/">Beranda</Link>
                            } />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={
                                <Link 
                                    className="text-xs md:text-sm"
                                    href="/products">Katalog Produk
                                </Link>
                            } />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-xs md:text-sm">Produk Baru</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

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