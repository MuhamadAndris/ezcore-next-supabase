"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Progress,
    ProgressLabel,
    ProgressTrack,
    ProgressValue,
} from "@/components/ui/progress"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    IconClock,
    IconTarget,
    IconTrendingUp,
    IconUser,
    IconWallet,
} from "@tabler/icons-react"
import Link from "next/link"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const items = [
    {
        label: 2026,
        value: 2026,
    },
    {
        label: 2025,
        value: 2025,
    },
]

const chartConfig = {
    2026: {
        label: "2026",
        color: "#2563eb",
    },
    2025: {
        label: "2025",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const chartData = [
    { month: "January", 2026: 186, 2025: 80 },
    { month: "February", 2026: 305, 2025: 200 },
    { month: "March", 2026: 237, 2025: 120 },
    { month: "April", 2026: 73, 2025: 190 },
    { month: "May", 2026: 209, 2025: 130 },
    { month: "June", 2026: 214, 2025: 140 },
]

export default function OrderPage() {
    return (
        <div className="w-full lg:container mx-auto p-2 md:p-4 space-y-5">
            <div className="flex gap-6 justify-between items-center p-2 ">
                <div>
                    <h1
                        className="
                        font-semibold
                        text-2xl
                        md:text-[32px]
                    "
                    >
                        Sales Overview
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-md">
                        Lacak performa toko dan kesehatan inventaris Anda
                    </p>
                </div>
                <Button>
                    <Link href="/orders/new">Order Baru</Link>
                </Button>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>TOTAL OMSET (MTD)</CardTitle>
                    <CardAction className="bg-primary/10 text-primary p-2 rounded-xl">
                        <IconWallet />
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1">
                    <Progress value={80}>
                        <ProgressLabel>
                            <h3 className="font-semibold text-2xl">
                                Rp. 900.000
                            </h3>
                        </ProgressLabel>
                        <ProgressValue />
                    </Progress>
                    <CardDescription className="text-green-700 flex gap-1 mt-2">
                        <IconTrendingUp size={18} />
                        <p>+12.5% vs bulan lalu</p>
                    </CardDescription>
                </CardContent>
                <CardFooter className="grid grid-cols-4">
                    <span>
                        <p className="text-muted-foreground">ATV</p>
                        <p className="text-md font-semibold">18.5 jt</p>
                    </span>
                    <span>
                        <p className="text-muted-foreground">UPT</p>
                        <p className="text-md font-semibold">2.4 unit</p>
                    </span>
                    <span>
                        <p className="text-muted-foreground">CR</p>
                        <p className="text-md font-semibold">20%</p>
                    </span>
                    <span>
                        <p className="text-muted-foreground">ESTIMASI</p>
                        <p className="text-md font-semibold">130 jt</p>
                    </span>
                </CardFooter>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Performa Penjual</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                    <div className="flex gap-2">
                        <div className="border relative aspect-square w-10 rounded-sm">
                            <IconUser className="w-full h-full" />
                        </div>
                        <Progress value={20} className="flex-1">
                            <ProgressLabel>Andris</ProgressLabel>
                            <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                                Rp 410jt / 500jt
                            </span>
                        </Progress>
                    </div>
                    <div className="flex gap-2">
                        <div className="border relative aspect-square w-10 rounded-sm">
                            <IconUser className="w-full h-full" />
                        </div>
                        <Progress value={20} className="flex-1">
                            <ProgressLabel>Andris</ProgressLabel>
                            <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                                Rp 410jt / 500jt
                            </span>
                        </Progress>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ringkasan Penjualan Bulanan</CardTitle>
                    <CardAction>
                        <Select items={items} defaultValue={2026}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {items.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={chartConfig}
                        className="min-h-50 w-full"
                    >
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <Bar
                                dataKey="2026"
                                fill="var(--color-2025)"
                                radius={4}
                            />
                            <Bar
                                dataKey="2025"
                                fill="var(--color-2026)"
                                radius={4}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top 5 Produk Terlaris</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="border-b-3">
                            <TableHead>#</TableHead>
                            <TableHead>PRODUK</TableHead>
                            <TableHead>TERJUAL</TableHead>
                            <TableHead>OMSET</TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Voja</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>200.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>Voja</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>200.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3</TableCell>
                                <TableCell>Voja</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>200.000</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
