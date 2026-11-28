"use client"

import { IconFilter } from "@tabler/icons-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductFilter } from "@/schemas/product.schema"

interface FilterProdctProps {
    onFilter: (v: ProductFilter) => void
}

const categorys = ["Semua", "Luggage Accessories", "Travel Bags"]
const brands = ["Semua", "LOJEL", "BAGASI"]

export default function FilterProductTriggerd({ onFilter }: FilterProdctProps) {
    const [category, setCategory] = useState("Semua")
    const [brand, setBrand] = useState("Semua")

    const isFilter = category !== "Semua" || brand !== "Semua"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        className={cn(isFilter && "bg-accent")}
                    >
                        <IconFilter />
                    </Button>
                }
            />
            <DropdownMenuContent>
                {/* FILTER BY KATEGORI */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {category}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={category}
                                    onValueChange={(value) => {
                                        setCategory(value)
                                        onFilter({
                                            brand:
                                                brand === "Semua"
                                                    ? undefined
                                                    : brand,
                                            category:
                                                value === "Semua"
                                                    ? undefined
                                                    : value,
                                        })
                                    }}
                                >
                                    {categorys.map((c) => (
                                        <DropdownMenuRadioItem
                                            key={c}
                                            value={c}
                                        >
                                            {c}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* FILTER BY BRAND */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Brand</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>{brand}</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={brand}
                                    onValueChange={(value) => {
                                        setBrand(value)
                                        onFilter({
                                            brand:
                                                value === "Semua"
                                                    ? undefined
                                                    : value,
                                            category:
                                                category === "Semua"
                                                    ? undefined
                                                    : category,
                                        })
                                    }}
                                >
                                    {brands.map((b) => (
                                        <DropdownMenuRadioItem
                                            key={b}
                                            value={b}
                                        >
                                            {b}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
