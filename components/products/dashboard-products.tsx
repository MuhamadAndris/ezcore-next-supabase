import {
    IconBackpack,
    IconDashboard,
    IconDiscount,
    IconLuggage,
} from "@tabler/icons-react"
import DashboardCard, { DashboardCardProps } from "./dashboard-card"

const CARDS: DashboardCardProps[] = [
    {
        label: "SKU",
        value: 2,
        description: "+25% form last month",
        icon: IconDashboard,
        unit: "produk",
    },
    {
        label: "KOLEKSI",
        value: 10,
        description: "+25% form last month",
        icon: IconLuggage,
        unit: "koleksi",
    },
    {
        label: "PROMO",
        value: 0,
        description: "+25% form last month",
        icon: IconDiscount,
        unit: "aktif",
    },
    {
        label: "STOCK",
        value: 35,
        description: "+25% form last month",
        icon: IconBackpack,
        unit: "pcs",
    },
]

export default function DashboardProduct() {
    return (
        <div className="grid gap-3 grid-cols-4 md:grid-cols-4 p-2 md:p-0">
            {CARDS.map((card) => (
                <DashboardCard key={card.label} card={card} />
            ))}
        </div>
    )
}
