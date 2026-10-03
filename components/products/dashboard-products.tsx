import { IconBackpack, IconDashboard, IconDiscount, IconLuggage } from "@tabler/icons-react";
import DashboardCard, { DashboardCardProps } from "./dashboard-card";

const CARDS:DashboardCardProps[] = [
    {
        label: "SKU",
        value: 0,
        description: "+25% form last month",
        icon: IconDashboard
    },
    {
        label: "KOLEKSI",
        value: 0,
        description: "+25% form last month",
        icon: IconLuggage
    },
    {
        label: "PROMO",
        value: 0,
        description: "+25% form last month",
        icon: IconDiscount
    },
    {
        label: "STOCK",
        value: 0,
        description: "+25% form last month",
        icon: IconBackpack
    },

]

export default function DashboardProduct() {
    return (
        <div className="
            mx-4
            mb-6
            md:my-6
            grid gap-1 grid-cols-4 md:grid-cols-4
        ">

            { CARDS.map((card) => 
                <DashboardCard key={card.label} card={card} />
            )}
            
        </div>
    )
}