import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import TableFilter from "./table-filter";
import TableHeaderProducts from "./table-header-products";
import TableRowProducts, { IProduct } from "./table-row-product";
import LINK from "@/const/LINK";
import Link from "next/link";

const products: IProduct[] = [
  {
    id: 1,
    sku: "LOJ000001",
    brand: "LOJEL",
    name: "CUBO FIT",
    category: "Koper",
    sub_category: "Hardcase",
    color: "Black",
    size: "20",
    stock: 12,
    normal_price: 2700000,
    promo_price: 1890000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 1,
        name: "September Sale",
        discount: 30,
        start_date: "2026-09-01",
        end_date: "2026-09-30",
      },
    ],
  },
  {
    id: 2,
    sku: "LOJ000002",
    brand: "LOJEL",
    name: "CUBO FIT",
    category: "Koper",
    sub_category: "Hardcase",
    color: "Cream",
    size: "24",
    stock: 8,
    normal_price: 3200000,
    promo_price: 3200000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [],
  },
  {
    id: 3,
    sku: "LOJ000003",
    brand: "LOJEL",
    name: "VOJA",
    category: "Koper",
    sub_category: "Softcase",
    color: "Navy",
    size: "20",
    stock: 5,
    normal_price: 2500000,
    promo_price: 2000000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 2,
        name: "Travel Season",
        discount: 20,
        start_date: "2026-09-10",
        end_date: "2026-09-25",
      },
    ],
  },
  {
    id: 4,
    sku: "LOJ000004",
    brand: "LOJEL",
    name: "ROVER",
    category: "Tas",
    sub_category: "Backpack",
    color: "Olive",
    size: "25L",
    stock: 21,
    normal_price: 1800000,
    promo_price: 1080000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 3,
        name: "Member Sale",
        discount: 40,
        start_date: "2026-09-01",
        end_date: "2026-09-30",
      },
    ],
  },
  {
    id: 5,
    sku: "LOJ000005",
    brand: "LOJEL",
    name: "FRAIM",
    category: "Koper",
    sub_category: "Hardcase",
    color: "Sand",
    size: "28",
    stock: 0,
    normal_price: 3800000,
    promo_price: 3800000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [],
  },
  {
    id: 6,
    sku: "LOJ000006",
    brand: "LOJEL",
    name: "TOURER",
    category: "Tas",
    sub_category: "Travel Bag",
    color: "Dark Grey",
    size: "24L",
    stock: 3,
    normal_price: 2200000,
    promo_price: 1540000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 4,
        name: "Travel Season",
        discount: 30,
        start_date: "2026-09-01",
        end_date: "2026-10-15",
      },
    ],
  },
  {
    id: 7,
    sku: "LOJ000007",
    brand: "LOJEL",
    name: "NARITA",
    category: "Tas",
    sub_category: "Tote Bag",
    color: "White",
    size: "Medium",
    stock: 15,
    normal_price: 1200000,
    promo_price: 1200000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [],
  },
  {
    id: 8,
    sku: "LOJ000008",
    brand: "LOJEL",
    name: "NARITA",
    category: "Tas",
    sub_category: "Tote Bag",
    color: "Black",
    size: "Large",
    stock: 7,
    normal_price: 1500000,
    promo_price: 750000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 5,
        name: "Clearance Sale",
        discount: 50,
        start_date: "2026-09-01",
        end_date: "2026-09-20",
      },
    ],
  },
  {
    id: 9,
    sku: "LOJ000009",
    brand: "LOJEL",
    name: "FREEDOM",
    category: "Aksesoris",
    sub_category: "Cover Koper",
    color: "Forest Green",
    size: "L",
    stock: 2,
    normal_price: 500000,
    promo_price: 375000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [
      {
        id: 6,
        name: "September Promo",
        discount: 25,
        start_date: "2026-09-01",
        end_date: "2026-09-30",
      },
    ],
  },
  {
    id: 10,
    sku: "LOJ000010",
    brand: "LOJEL",
    name: "HATSU",
    category: "Aksesoris",
    sub_category: "Travel Accessories",
    color: "Beige",
    size: "One Size",
    stock: 18,
    normal_price: 350000,
    promo_price: 350000,
    image_url: "https://dynamic.zacdn.com/fuMIicua8sY6QGtt5dUvPy2UTs4=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-3551-9990905-1.jpg",
    promos: [],
  },
]

export default function TableProducts() {
    return (
        <div className="border md:rounded-md md:mx-4">
            <div className="sticky top-0 bg-background z-10 p-4 flex gap-4 items-center justify-between border-b rounded-t-md">
              <div className="flex-1 flex gap-4 items-center">
                
                {/* search input */}
                <div className="relative flex items-center w-full">
                  <IconSearch className="absolute left-2 text-muted-foreground" />
                  <Input
                      placeholder="Cari SKU atau nama produk..."
                      className="w-full h-10 pl-10"
                  />
                </div>

                {/* filter */}
                <TableFilter />
            </div>

            {/* Add product btn */}
            <Link
                  href={LINK.NEW_PRODUCT}
                  className="
                      bg-primary
                      hover:bg-primary/90
                      text-primary-foreground
                      px-2 md:px-4 py-1 md:py-2
                      rounded-md
                      truncate
                      flex gap-3
                  ">
                    <IconPlus />
                    <span className="hidden md:inline">Tambah Produk</span>
              </Link>
            </div>

            <Table>
                <TableHeaderProducts />
                <TableBody>
                    { products.map((p) => 
                        <TableRowProducts key={p.id} product={p} />
                    )}
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
    )
}