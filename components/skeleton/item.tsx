import { Item, ItemMedia, ItemContent, ItemActions } from "../ui/item"
import { Skeleton } from "../ui/skeleton"

interface ItemSkeletonProps {
    qty?: number
}

export default function ItemSkeleton({ qty = 1 }: ItemSkeletonProps) {
    return (
        <>
            {Array.from({ length: qty }).map((_, i) => (
                <Item key={i}>
                    <ItemMedia variant="image" className="relative">
                        <Skeleton className="w-12.5 aspect-square" />
                    </ItemMedia>
                    <ItemContent className="min-w-0 flex-1">
                        <Skeleton className="w-70 h-5" />
                        <Skeleton className="w-30 h-4" />
                    </ItemContent>
                    <ItemActions>
                        <Skeleton className="w-4 h-7" />
                    </ItemActions>
                </Item>
            ))}
        </>
    )
}
