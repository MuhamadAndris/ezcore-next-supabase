import { IconFilter } from "@tabler/icons-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function TableFilter() {
    const [ category, setCategory ] = useState("Semua")
    const [ brand, setBrand ] = useState("Semua")

    const isFilter = category !== "Semua" || brand !== "Semua"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="outline" className={cn(isFilter && "bg-accent")}>
                    <IconFilter />
                </Button>
            } />
            <DropdownMenuContent>

                {/* FILTER BY KATEGORI */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>{category}</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                                    <DropdownMenuRadioItem value="Semua">Semua</DropdownMenuRadioItem>
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
                    <DropdownMenuLabel>Brand</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>{brand}</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={brand} onValueChange={setBrand}>
                                    <DropdownMenuRadioItem value="Semua">Semua</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="LOJEL">LOJEL</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="BAGASI">BAGASI</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}