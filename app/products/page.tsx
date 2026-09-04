"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LINK from "@/const/LINK";
import { IconFilter, IconPencil, IconReceipt, IconSearch, IconTag, IconTrendingUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
    const [ category, setCategory ] = useState("Semua kategori")
    const [ brand, setBrand ] = useState("Semua Brand")
    return (
        <>
            {/* header */}
            <div className="flex gap-6 justify-between items-center p-2 m-4 md:p-0">
                <div>
                    <h1 className="
                        font-semibold
                        text-2xl
                        md:text-[32px]
                    ">
                        Katalog Produk
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-md">Kelola inventaris, harga, dan ketersedian produk</p>
                </div>
                <div>
                    <Link
                        href={LINK.NEW_PRODUCT}
                        className="
                            bg-primary
                            hover:bg-primary/90
                            text-primary-foreground
                            px-4 py-2
                            rounded-md
                            truncate
                        ">
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* cards */}
            <div className="
                mx-4
                my-0
                md:my-6
                grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-1
                md:flex md:gap-4
                p-2 md:p-0
                md:text-md
                lg:text-lg
                text-[10px]
            ">
                
                {/* total sku card */}
                <div className="w-full bg-accent border rounded-[0.35em]">
                    <div className="p-[1.3em]">
                        <div className="flex justify-between">
                            <p className="text-[.8em] text-muted-foreground">TOTAL SKU</p>
                            <IconReceipt className="w-[1.5em] h-[1.5em]" />
                        </div>
                        <p className="text-[1.4em] font-semibold my-[.4em]">123</p>
                        <div className="text-[#006575] flex items-center gap-[.3em]">
                            <IconTrendingUp className="w-[.8em] h-[.8em]" />
                            <p className="text-[.67em]"> +12 bulan ini</p>
                        </div>
                    </div>
                </div>
                
                {/* total sku card */}
                <div className="w-full bg-accent border rounded-[0.35em]">
                    <div className="p-[1.3em]">
                        <div className="flex justify-between">
                            <p className="text-[.8em] text-muted-foreground">TOTAL SKU</p>
                            <IconReceipt className="w-[1.5em] h-[1.5em]" />
                        </div>
                        <p className="text-[1.4em] font-semibold my-[.4em]">123</p>
                        <div className="text-[#006575] flex items-center gap-[.3em]">
                            <IconTrendingUp className="w-[.9em] h-[.9em]" />
                            <p className="text-[.67em]"> +12 bulan ini</p>
                        </div>
                    </div>
                </div>
                
                {/* total sku card */}
                <div className="w-full bg-accent border rounded-[0.35em]">
                    <div className="p-[1.3em]">
                        <div className="flex justify-between">
                            <p className="text-[.8em] text-muted-foreground">TOTAL SKU</p>
                            <IconReceipt className="w-[1.5em] h-[1.5em]" />
                        </div>
                        <p className="text-[1.4em] font-semibold my-[.4em]">123</p>
                        <div className="text-[#006575] flex items-center gap-[.3em]">
                            <IconTrendingUp className="w-[.9em] h-[.9em]" />
                            <p className="text-[.67em]"> +12 bulan ini</p>
                        </div>
                    </div>
                </div>
                
                {/* total sku card */}
                <div className="w-full bg-accent border rounded-[0.35em]">
                    <div className="p-[1.3em]">
                        <div className="flex justify-between">
                            <p className="text-[.8em] text-muted-foreground">TOTAL SKU</p>
                            <IconReceipt className="w-[1.5em] h-[1.5em]" />
                        </div>
                        <p className="text-[1.4em] font-semibold my-[.4em]">123</p>
                        <div className="text-[#006575] flex items-center gap-[.3em]">
                            <IconTrendingUp className="w-[.9em] h-[.9em]" />
                            <p className="text-[.67em]"> +12 bulan ini</p>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* table */}
            <div className="border">
                <div className="m-4 md:flex items-center gap-4">
                    {/* search */}
                    <div className="relative flex items-center">
                        <IconSearch className="absolute left-2 text-muted-foreground" />
                        <Input
                            placeholder="Cari SKU atau nama produk..."
                            className="md:w-[320px] h-10 pl-10"
                        />
                    </div>

                    {/* filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline"><IconFilter /></Button>} />
                        <DropdownMenuContent>

                            {/* FILTER BY KATEGORI */}
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Filter Kategori</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                                                <DropdownMenuRadioItem value="Semua Kategori">Semua Kategori</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Travel">Travel</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Non Travel">Non Travel</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            {/* FILTER BY BRAND */}
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Filter Brand</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={brand} onValueChange={setBrand}>
                                                <DropdownMenuRadioItem value="Semua Brand">Semua Brand</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="LOJEL">LOJEL</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="BAGASI">BAGASI</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="border-t">
                            <TableHead className="text-muted-foreground p-4.25"><Checkbox /></TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">DESKRIPSI PRODUK</TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">KATEGORI</TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">STOCK</TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">HARGA</TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">PROMO</TableHead>
                            <TableHead className="text-muted-foreground px-3 py-4.25">AKSI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <TableRow>
                            <TableCell className="p-4.25"><Checkbox /></TableCell>
                            <TableCell className="flex gap-3 p-3">
                                <div className="aspect-square h-10 relative">
                                    <Image
                                        fill
                                        src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                        alt="Product Image"
                                        className="object-contain"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <p>LOJEL CUBO</p>
                                    <p className="text-muted-foreground">971253123 | S | Black</p>
                                </div>
                            </TableCell>
                            <TableCell className="p-3">Kategori 1</TableCell>
                            <TableCell className="p-3">100</TableCell>
                            <TableCell className="p-3">Rp 100.000</TableCell>
                            <TableCell className="p-3">
                                <Button variant="outline">
                                    <IconTag className="text-[#006575]" />
                                    <p className="ml-2">Promo 1</p>
                                </Button>
                            </TableCell>
                            <TableCell className="p-3">
                                <Button variant="ghost" size="sm" className="text-[#58423C]">
                                    <IconPencil />
                                </Button>
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell className="p-4.25"><Checkbox /></TableCell>
                            <TableCell className="flex gap-3 p-3">
                                <div className="aspect-square h-10 relative">
                                    <Image
                                        fill
                                        src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                        alt="Product Image"
                                        className="object-contain"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <p>LOJEL CUBO</p>
                                    <p className="text-muted-foreground">971253123 | S | Black</p>
                                </div>
                            </TableCell>
                            <TableCell className="p-3">Kategori 1</TableCell>
                            <TableCell className="p-3">100</TableCell>
                            <TableCell className="p-3">Rp 100.000</TableCell>
                            <TableCell className="p-3">
                                <Button variant="outline">
                                    <IconTag className="text-[#006575]" />
                                    <p className="ml-2">Promo 1</p>
                                </Button>
                            </TableCell>
                            <TableCell className="p-3">
                                <Button variant="ghost" size="sm" className="text-[#58423C]">
                                    <IconPencil />
                                </Button>
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell className="p-4.25"><Checkbox /></TableCell>
                            <TableCell className="flex gap-3 p-3">
                                <div className="aspect-square h-10 relative">
                                    <Image
                                        fill
                                        src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                        alt="Product Image"
                                        className="object-contain"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <p>LOJEL CUBO</p>
                                    <p className="text-muted-foreground">971253123 | S | Black</p>
                                </div>
                            </TableCell>
                            <TableCell className="p-3">Kategori 1</TableCell>
                            <TableCell className="p-3">100</TableCell>
                            <TableCell className="p-3">Rp 100.000</TableCell>
                            <TableCell className="p-3">
                                <Button variant="outline">
                                    <IconTag className="text-[#006575]" />
                                    <p className="ml-2">Promo 1</p>
                                </Button>
                            </TableCell>
                            <TableCell className="p-3">
                                <Button variant="ghost" size="sm" className="text-[#58423C]">
                                    <IconPencil />
                                </Button>
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={7} className="p-4.25">
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Menampilkan 1-10 dari 100 produk</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Sebelumnya</Button>
                                        <Button variant="outline" size="sm">Berikutnya</Button>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

        </>
    )
}