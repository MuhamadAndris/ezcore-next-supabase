import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LINK from "@/const/LINK";
import { IconAlertCircle, IconAlertTriangle, IconPencil, IconReceipt, IconSearch, IconTag, IconTrendingUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <>
            {/* header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[32px]">Katalog Produk</h1>
                    <p className="text-muted-foreground">Kelola inventaris, harga, dan ketersedian produk</p>
                </div>
                <div>
                    <Link href={LINK.NEW_PRODUCT} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* cards */}
            <div className="flex gap-4 my-6">
                
                {/* total sku card */}
                <div className="w-full bg-[#FCF9F8] border border-[#DFC0B7] rounded-md">
                    <div className="p-6">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">TOTAL SKU</p>
                            <IconReceipt />
                        </div>
                        <p className="text-2xl font-semibold my-2">123</p>
                        <div className="text-[#006575] flex gap-3">
                            <IconTrendingUp />
                            <p> +12 bulan ini</p>
                        </div>
                    </div>
                </div>

                {/* STOK RENDAH */}
                <div className="w-full bg-[#FCF9F8] border border-[#DFC0B7] rounded-md">
                    <div className="p-6">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">STOK RENDAH</p>
                            <IconAlertTriangle className="text-destructive" />
                        </div>
                        <p className="text-2xl font-semibold my-2">123</p>
                        <p className="text-muted-foreground">Butuh re-Order segera</p>
                    </div>
                </div>
                
                {/* SLOW MOVING */}
                <div className="w-full bg-[#FCF9F8] border border-[#DFC0B7] rounded-md">
                    <div className="p-6">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">SLOW MOVING</p>
                            <IconAlertCircle className="text-destructive" />
                        </div>
                        <p className="text-2xl font-semibold my-2">123</p>
                        <p className="text-muted-foreground">Kehilangan potensi penjaualan</p>
                    </div>
                </div>
                
                {/* PRODUK PROMO */}
                <div className="w-full bg-[#FCF9F8] border border-[#DFC0B7] rounded-md">
                    <div className="p-6">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">PRODUK PROMO</p>
                            <IconTag className="text-[#006575]" />
                        </div>
                        <p className="text-2xl font-semibold my-2">123</p>
                        <p className="text-muted-foreground">Aktif di 3 campaign</p>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="border">
                <div className="m-4 flex justify-between">
                    {/* search */}
                    <div className="relative flex items-center">
                        <IconSearch className="absolute left-2 text-muted-foreground" />
                        <Input placeholder="Cari SKU atau nama produk..." className="w-[320px] h-10 pl-10" />
                    </div>

                    {/* filter */}
                    <div className="flex gap-3">
                        {/* kategori */}
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="outline">Semua Kategori</Button>} />
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Semua Kategori</DropdownMenuItem>
                                    <DropdownMenuItem>Kategori 1</DropdownMenuItem>
                                    <DropdownMenuItem>Kategori 2</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* brand */}
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="outline">Semua Brand</Button>} />
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Semua Brand</DropdownMenuItem>
                                    <DropdownMenuItem>Brand 1</DropdownMenuItem>
                                    <DropdownMenuItem>Brand 2</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
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