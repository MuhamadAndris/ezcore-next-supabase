"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    IconBriefcase,
    IconBriefcaseFilled,
    IconCategory,
    IconCategoryFilled,
    IconShoppingCart,
    IconShoppingCartFilled,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: IconCategory,
        iconFilled: IconCategoryFilled,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: IconShoppingCart,
        iconFilled: IconShoppingCartFilled,
    },
    {
        title: "Products",
        url: "/products",
        icon: IconBriefcase,
        iconFilled: IconBriefcaseFilled,
    },
]

export function AppSidebar() {
    const { open } = useSidebar()
    const pathName = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-between">
                    {open && <h1>EzCore</h1>}
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive =
                            item.url.split("/")[1] === pathName.split("/")[1]
                        return (
                            <SidebarMenuItem
                                key={item.title}
                                className="flex justify-center"
                            >
                                <SidebarMenuButton
                                    render={<Link href={item.url} />}
                                    isActive={isActive}
                                >
                                    {isActive ? (
                                        <item.iconFilled />
                                    ) : (
                                        <item.icon />
                                    )}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
