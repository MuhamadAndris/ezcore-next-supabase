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
    IconUserSquareRounded,
    IconWallet,
} from "@tabler/icons-react"
import Link from "next/link"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    PieChart,
    Pie,
    Label,
    YAxis,
} from "recharts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

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

const chartData = [
    { brand: "LOJEL", sales: 50000000, fill: "var(--color-LOJEL)" },
    { brand: "AT", sales: 40000000, fill: "var(--color-AT)" },
]

const chartConfig = {
    LOJEL: {
        label: "LOJEL",
        color: "var(--chart-1)",
    },
    AT: {
        label: "American Tourister",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

const salesYearly = [
    { month: "January", 2026: 186, 2025: 80 },
    { month: "February", 2026: 305, 2025: 200 },
    { month: "March", 2026: 237, 2025: 120 },
    { month: "April", 2026: 73, 2025: 190 },
    { month: "May", 2026: 209, 2025: 130 },
    { month: "June", 2026: 214, 2025: 140 },
]

const salesLastYearConfig = {
    2026: {
        label: "2026",
        color: "#2563eb",
    },
    2025: {
        label: "2025",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export default function OrderPage() {
    return (
        <div className="w-full lg:container mx-auto p-2 md:p-4 space-y-4 overflow-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1fr] gap-4">
                {/* MTD */}
                <Card>
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

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performa Brand</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Item>
                                <ItemContent>
                                    <ItemTitle>LOJEL</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                            <Separator />
                            <Item>
                                <ItemContent>
                                    <ItemTitle>BAGASI</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                        </CardContent>
                    </Card>

                    {/* Sales per SA */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performa SA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Item>
                                <ItemMedia>
                                    <IconUserSquareRounded className="w-full h-full" />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>ANDRIS</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                            <Separator />
                            <Item>
                                <ItemMedia>
                                    <IconUserSquareRounded className="w-full h-full" />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>RIJAL</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1fr] gap-4">
                {/* Sales Yearly */}
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
                    <CardContent className="flex-1  p-0">
                        <ChartContainer
                            config={salesLastYearConfig}
                            className="md:min-h-80 w-full h-full"
                        >
                            <BarChart accessibilityLayer data={salesYearly}>
                                <CartesianGrid vertical={false} />
                                {/* <YAxis /> */}
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
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Sales per category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Per-Category</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center p-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-62.5 w-full"
                            >
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="sales"
                                        nameKey="brand"
                                        innerRadius={65}
                                        outerRadius={100}
                                        paddingAngle={1}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    viewBox &&
                                                    "cx" in viewBox &&
                                                    "cy" in viewBox
                                                ) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    viewBox.cy -
                                                                    8
                                                                }
                                                                className="fill-foreground text-xl font-bold"
                                                            >
                                                                Rp90 Jt
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    viewBox.cy +
                                                                    16
                                                                }
                                                                className="fill-muted-foreground text-xs"
                                                            >
                                                                Total Penjualan
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>

                        <Separator />

                        {/* Informasi tambahan */}
                        <CardContent className="space-y-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Total Transaksi
                                </span>
                                <span className="font-semibold">125</span>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Rata-rata Penjualan
                                </span>
                                <span className="font-semibold">Rp720 Rb</span>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Brand Terlaris
                                </span>
                                <span className="font-semibold">LOJEL</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top 5 Sales */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Produk Terlaris</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Item>
                                <ItemMedia>1</ItemMedia>
                                <ItemContent>
                                    <ItemTitle>VOJA</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                            <Separator />
                            <Item>
                                <ItemMedia>2</ItemMedia>
                                <ItemContent>
                                    <ItemTitle>VOJA</ItemTitle>
                                    <ItemDescription>25 unit</ItemDescription>
                                </ItemContent>
                                <ItemActions>Rp. 125.000</ItemActions>
                            </Item>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
