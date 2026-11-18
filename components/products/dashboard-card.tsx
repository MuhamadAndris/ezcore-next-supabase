import { TablerIcon } from "@tabler/icons-react"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

export interface DashboardCardProps {
    label: string
    icon: TablerIcon
    value: number
    description: string
    descriptionIcon?: TablerIcon
    unit: string
}

export default function DashboardCard({ card }: { card: DashboardCardProps }) {
    const Icon = card.icon
    const IconDesc = card.descriptionIcon

    return (
        <Card className="gap-0">
            <CardHeader>
                <CardTitle className="text-xs md:text-lg">
                    {card.label}
                </CardTitle>
                <CardAction>
                    <Icon className="hidden md:block w-4 md:w-7 h-4 md:h-7" />
                </CardAction>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-xl md:text-3xl font-semibold my-2 md:my-4">
                    <span>{card.value}</span>
                    <span className="text-muted-foreground text-xs">
                        {" "}
                        {card.unit}
                    </span>
                </p>
                <div className="text-[#006575] hidden md:flex items-center gap-1">
                    {IconDesc && <IconDesc />}
                </div>
            </CardContent>
            <CardFooter className="hidden md:flex">
                <p className="text-[10px] md:text-xs truncate">
                    {" "}
                    {card.description}
                </p>
            </CardFooter>
        </Card>
    )
}
