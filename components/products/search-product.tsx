import { IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { memo, useState } from "react";
import { createClient } from "@/lib/client";
import { Product } from "@/schemas/product.schema";
import { toast } from "sonner";

interface SearchProductProps {
    setProducts: (p: Product[]) => void
}

const SearchProduct = memo(({ setProducts }: SearchProductProps) => {
    console.log("render - Search product")

    const [searchValue, setSearchValue] = useState<string>("")

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        const keywords = value.trim().split(/\s+/).filter(Boolean);
        
        const supabase = createClient();
        
        let query = supabase
            .from("products")
            .select("*")
            .eq("is_deleted", false);

        for (const keyword of keywords) {
            query = query.or(`sku.ilike.%${keyword}%,name.ilike.%${keyword}%,brand.ilike.%${keyword}%,category.ilike.%${keyword}%, color.ilike.%${keyword}%,size.ilike.%${keyword}%`);
        }

        const { data, error } = await query
            .order("created_at", { ascending: false })
            .order("id", { ascending: false })
            .range(0, 9)
        ;

        if(error) toast.error("Gagal memuat produk")

        setProducts(data ?? []);
    }

    return (
        <div className="relative flex items-center w-full">
            <IconSearch className="absolute left-2 text-muted-foreground" />
            <Input
                placeholder="Cari SKU atau nama produk..."
                className="w-full h-10 pl-10"
                onChange={handleSearch}
                value={searchValue}
                type="search"
            />
        </div>
    )
})

export default SearchProduct