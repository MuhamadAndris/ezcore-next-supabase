import { IconChevronDown, IconLuggage } from "@tabler/icons-react"
import { Card, CardContent, CardHeader } from "../../ui/card"
import {
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
} from "../../ui/item"
import { useState } from "react"

export default function OrderHistory() {
    return (
        <div className="space-y-5">
            <OrderDateGroup />
            <OrderDateGroup />
            <OrderDateGroup />
        </div>
    )
}
export function OrderDateGroup() {
    return (
        <div>
            <p className="flex justify-between mb-2">
                <span className="font-medium">Sabtu, 24 Oktober 2026</span>
                <span className="text-muted-foreground text-sm">
                    3 bon · Rp 15.790.800
                </span>
            </p>

            {/* Item */}
            <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <OrderCard key={i} />
                ))}
            </div>
        </div>
    )
}

export function OrderCard() {
    const [showItem, setShowItem] = useState(false)
    return (
        <div className="space-y-2">
            <Card className="p-0 gap-0">
                <CardHeader
                    className="p-0 cursor-pointer"
                    onClick={() => setShowItem((prev) => !prev)}
                >
                    <OrderCardHeader />
                </CardHeader>
                {showItem && <OrderProductList />}
            </Card>
        </div>
    )
}

export function OrderCardHeader({ ...props }: React.ComponentProps<"div">) {
    return (
        <Item {...props}>
            <ItemMedia variant="icon">
                <IconChevronDown className="text-muted-foreground" />
            </ItemMedia>
            <ItemContent className="gap-0">
                <ItemTitle>INV-2601-001</ItemTitle>
                <ItemDescription>09:05 · Andris · 2 Item</ItemDescription>
            </ItemContent>
            <ItemActions className="gap-1">
                <span className="text-muted-foreground text-xs">Rp</span>
                <span className="font-semibold">500.000</span>
            </ItemActions>
        </Item>
    )
}

export function OrderProductList() {
    return (
        <CardContent className="p-0">
            <OrderProductItem />
        </CardContent>
    )
}

export function OrderProductItem() {
    return (
        <Item className="gap-0 hover:bg-accent/60 rounded-none border-t-accent pl-7">
            <ItemMedia variant="image">
                <IconLuggage />
            </ItemMedia>
            <ItemContent className="gap-0">
                <ItemTitle className="text-xs">LOJEL VOJA BLUE S</ItemTitle>
                <ItemDescription className="text-xs">
                    Rp. 125.000 /pcs
                </ItemDescription>
            </ItemContent>
        </Item>
    )
}
