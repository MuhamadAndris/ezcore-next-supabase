import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconCameraPlus, IconChevronDown, IconChevronRight, IconImageGeneration, IconPhotoPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function NewProductPage() {
    return (
        <div className="max-w-200 mx-auto my-8">
            <Breadcrumb className="text-[14px]">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Katalog Produk</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Produk Baru</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-[32px] font-semibold mb-6 mt-2">Tambah Produk Baru</h1>

            <form className="space-y-6">
                {/* informasi dasar */}
                <FieldGroup className="border p-6 rounded-md">
                    <FieldSet>
                        <FieldLegend className="font-semibold text-[24px]!">Informasi Dasar</FieldLegend>
                        <FieldSeparator />
                        <FieldGroup>
                            <Field>
                                <FieldLabel className="text-[12px] font-semibold">NAMA PRODUK *</FieldLabel>
                                <Input className="text-[14px]" type="text" placeholder="Nama Produk" required />
                            </Field>
                            <FieldGroup className="flex-row">
                                <Field>
                                    <FieldLabel className="text-[12px] font-semibold">SKU *</FieldLabel>
                                    <Input className="text-[14px]" type="text" placeholder="SKU" required />
                                </Field>
                                <Field>
                                    <FieldLabel className="text-[12px] font-semibold">BRAND *</FieldLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger render={
                                            <Button className="justify-between" variant="outline">
                                                Pilih Brand
                                                <IconChevronDown />
                                            </Button>
                                        } />
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>Brand 1</DropdownMenuItem>
                                                <DropdownMenuItem>Brand 2</DropdownMenuItem>
                                                <DropdownMenuItem>Brand 3</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>         
                                </Field>
                            </FieldGroup>
                            <Field>
                                <FieldLabel className="text-[12px] font-semibold">DESKRIPSI </FieldLabel>
                                <Textarea className="text-[14px]" placeholder="DESKRIPSI    " />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>

                {/* Media / gambar */}
                <FieldGroup className="border p-6 rounded-md">
                    <FieldSet>
                        <FieldLegend className="font-semibold text-[24px]!">Media</FieldLegend>

                        <div className="flex gap-5">

                            {/* preview */}
                            <div className="
                                relative
                                w-125 aspect-square
                                p-1 border
                                rounded-md
                            ">
                                <Image
                                    src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                    alt="Preview"
                                    sizes="500px"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            
                            <div className="flex-1 flex flex-col ">

                                {/* thumbnails */}
                                <div className="
                                    grid gap-2 content-start
                                    grid-cols-[repeat(auto-fit,minmax(100px,1fr))]
                                ">
                                    <div className="
                                        w-26.75
                                        border aspect-square
                                        relative
                                        rounded-md
                                        cursor-pointer
                                        overflow-hidden
                                        after:absolute after:inset-0 after:bg-black/10 after:opacity-0 hover:after:opacity-100
                                    ">
                                        <Image
                                            src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                            alt="Preview"
                                            sizes="100px"
                                            className="object-contain"
                                            fill
                                        />
                                    </div>
                                    

                                    {/* <div className="
                                        w-26.75 aspect-square
                                        border border-dashed
                                        text-muted-foreground
                                    ">
                                        <button
                                            type="button"
                                            className="
                                                h-full w-full
                                                flex justify-center items-center
                                                cursor-pointer
                                            "
                                        >
                                            <IconPhotoPlus />
                                        </button>
                                    </div> */}
                                </div>

                                {/* upload image */}
                                <div className="
                                    w-full h-full
                                    flex flex-col justify-center items-center
                                    bg-[#F6F3F2]
                                    mt-2
                                    border border-dashed
                                    rounded-md
                                    cursor-pointer
                                    relative
                                    after:absolute after:inset-0 after:bg-black/5 after:opacity-0 hover:after:opacity-100
                                ">
                                    <IconCameraPlus className="text-foreground/80" />
                                    <p className="text-center text-[14px] font-semibold">
                                        <span className="text-primary">Klik untuk unggah </span>
                                        <span className="text-foreground/80">atau seret gambar ke sini</span>
                                    </p>
                                    <span className="text-center text-[12px] text-muted-foreground">
                                        Format: JPG, PNG, WEBP (Maks 5MB)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </FieldSet>
                </FieldGroup>

                {/* Harga */}
                <FieldGroup className="border p-6 rounded-md">
                    <FieldSet>
                        <FieldLegend className="font-semibold text-[24px]!">Harga</FieldLegend>
                        <FieldSeparator />
                        <FieldGroup className="flex-row">
                            <Field>
                                <FieldLabel className="text-[12px] font-semibold">HARGA NORMAL *</FieldLabel>
                                <Input className="text-[14px]" type="number" placeholder="HARGA" required />
                            </Field>
                            <Field>
                                <FieldLabel className="text-[12px] font-semibold">HARGA PROMO</FieldLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={
                                        <Button className="justify-between" variant="outline">
                                            Tidak ada promo 
                                            <IconChevronDown />
                                        </Button>
                                    } />    
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Promo 1</DropdownMenuItem>
                                            <DropdownMenuItem>Promo 2</DropdownMenuItem>
                                            <DropdownMenuItem>Promo 3</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </Field>
                            <Field>
                                <FieldLabel className="text-[12px] font-semibold">HARGA SETELAH PROMO</FieldLabel>
                                <Input className="text-[14px]" type="number" placeholder="HARGA SETELAH PROMO" />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>

                {/* Footer */}
                <FieldGroup className="border p-6 rounded-md">
                    <div className="flex ml-auto">
                        <Button type="button" variant="outline" className="mr-2">BATAL</Button>
                        <Button type="submit">SIMPAN</Button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}