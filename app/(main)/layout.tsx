import AppMobileSidebar from "@/components/ui/app-mobile-sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { ReactNode } from "react"

export default function mainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <AppSidebar />
            <AppMobileSidebar />
            {children}
        </>
    )
}
