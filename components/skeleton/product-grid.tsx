import { Skeleton } from "../ui/skeleton"

interface Props {
    qty?: number
}

export default function SkeletonProductGrid({ qty = 8 }: Props) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 p-1 md:gap-4">
            {Array.from({ length: qty }).map((_, i) => (
                <div key={i} className="space-y-3 rounded-xl border p-3">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-9 w-full" />
                </div>
            ))}
        </div>
    )
}
