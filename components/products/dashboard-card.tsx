import { TablerIcon } from "@tabler/icons-react"

export interface DashboardCardProps {
    label: string
    icon: TablerIcon
    value: number
    description: string
    descriptionIcon?: TablerIcon
}

export default function DashboardCard({card} : {card: DashboardCardProps}) {
    const Icon = card.icon
    const IconDesc = card.descriptionIcon

    return (
        <div className="w-full bg-accent border rounded-md">
            <div className="p-3 md:p-6">
                <div className="flex justify-between items-center">
                    <p className="text-xs md:text-sm text-muted-foreground">{card.label}</p>
                    <Icon className="hidden md:block w-4 md:w-7 h-4 md:h-7" />
                </div>
                <p className="text-xl md:text-3xl font-semibold my-2 md:my-4">{card.value}</p>
                <div className="text-[#006575] hidden md:flex items-center gap-1">
                    { IconDesc && <IconDesc /> }
                    <p className="text-[10px] md:text-xs"> { card.description }</p>
                </div>
            </div>
        </div>
    )
}