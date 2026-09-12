import { IconReceipt, IconTrendingUp } from "@tabler/icons-react";

export default function DashboardCard() {
    return (
        <div className="w-full bg-accent border rounded-[0.35em]">
            <div className="p-[1.3em]">
                <div className="flex justify-between">
                    <p className="text-[.8em] text-muted-foreground">TOTAL SKU</p>
                    <IconReceipt className="w-[1.5em] h-[1.5em]" />
                </div>
                <p className="text-[1.4em] font-semibold my-[.4em]">123</p>
                <div className="text-[#006575] flex items-center gap-[.3em]">
                    <IconTrendingUp className="w-[.8em] h-[.8em]" />
                    <p className="text-[.67em]"> +12 bulan ini</p>
                </div>
            </div>
        </div>
    )
}