import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <section className="fixed inset-x-0 mx-auto w-full h-full xl:container">
            {/* Meniru navbar: search + tombol cart */}
            <div className="flex gap-3 px-5 pt-5 pb-2">
                <Skeleton className="h-9 flex-1 border" />
                <Skeleton className="h-9 w-10 border" />
            </div>

            <div className="flex space-x-2 pb-5 px-5">
                <Skeleton className="w-13.5 h-5 border" />
                <Skeleton className="w-13.5 h-5 border" />
                <Skeleton className="w-13.5 h-5 border" />
                <Skeleton className="w-13.5 h-5 border" />
            </div>

            {/* Meniru grid produk */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 p-1 md:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-3 rounded-xl border p-3">
                        <Skeleton className="aspect-square w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                ))}
            </div>
        </section>
    )
}