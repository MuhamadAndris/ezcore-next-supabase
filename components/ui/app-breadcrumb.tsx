import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

export type AppBreadcrumbMenu = {
    label: string
    url?: string
}

interface AppBreadcrumbProps {
    menus: AppBreadcrumbMenu[]
}

export default function AppBreadcrumb({
    menus
}:AppBreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                { menus.map((menu) => 
                    menu.url
                    ? <Fragment key={menu.url}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="text-xs md:text-sm"
                                    render={
                                    <Link href={menu.url}>{menu.label}</Link>
                                } />
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    : <BreadcrumbItem key={menu.label}>
                        <BreadcrumbPage className="text-xs md:text-sm">{menu.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                )}
                </BreadcrumbList>
        </Breadcrumb>
    )
}