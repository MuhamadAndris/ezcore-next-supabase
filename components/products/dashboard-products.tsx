import DashboardCard from "./dashboard-card";

export default function DashboardProduct() {
    return (
        <div className="
            mx-4
            my-0
            md:my-6
            grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-1
            md:flex md:gap-4
            p-2 md:p-0
            md:text-md
            lg:text-lg
            text-[10px]
        ">
            
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
            
        </div>
    )
}