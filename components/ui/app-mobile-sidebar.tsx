"use client"

import Link from "next/link"
import { items } from "./app-sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AppMobileSidebar() {
    const pathName = usePathname()

    return (
        <div className="md:hidden fixed bottom-0 w-full flex justify-between bg-popover z-10 border-t">
            {items.map((item) => {
                const isActive =
                    item.url.split("/")[1] === pathName.split("/")[1]

                return (
                    <div key={item.title} className="flex-1 ">
                        <Link
                            href={item.url}
                            className={cn(
                                "w-full flex justify-center p-2 rounded-md",

                                isActive && "bg-secondary"
                            )}
                        >
                            {isActive ? <item.iconFilled /> : <item.icon />}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
