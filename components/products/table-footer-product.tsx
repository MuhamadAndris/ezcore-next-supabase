import { Button } from "../ui/button"

// table-footer-products.tsx
interface FooterProps {
    shown: number
    count: number | null
    hasMore: boolean
    isLoading: boolean
    isEmpty: boolean
    loadMore: () => void
}

export default function FooterTableProduct({
    count,
    hasMore,
    isLoading,
    loadMore,
    isEmpty,
    shown
}:FooterProps) {
    return (
        <div className="p-3 border-t">
            { isEmpty
                ? (
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground text-sm">Menampilkan {shown} dari {count} produk</p>
                        <div className="flex gap-2">
                            {hasMore && (
                                <Button variant="outline" onClick={loadMore} disabled={isLoading}>
                                    {isLoading ? "Memuat..." : "Muat lebih banyak"}
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">
                        Tidak ada data produk
                    </p>
                )
            }
        </div>
    )
}