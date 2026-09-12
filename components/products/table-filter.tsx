import { IconFilter } from "@tabler/icons-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";

export default function TableFilter() {
    const [ category, setCategory ] = useState("Semua kategori")
    const [ brand, setBrand ] = useState("Semua Brand")
    
    return (
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
    )
}