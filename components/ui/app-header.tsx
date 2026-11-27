import { IconPlus, ReactNode } from "@tabler/icons-react"
import BackButton from "./back-button"
import { Button } from "./button"
import Link from "next/link"

interface AppHeaderProps {
    children: ReactNode
    title?: string
}

export default function AppHeader({ children, title }: AppHeaderProps) {
    return (
        <nav
            className="
            bg-popover py-2 pr-2
            flex flex-col gap-2
            sticky top-0 z-10
            border-b
        "
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex-1 flex items-center">
                    <BackButton />

                    {title && <h2 className="font-bold text-lg">{title}</h2>}
                </div>
                <div className="flex gap-1">{children}</div>
            </div>
        </nav>
    )
}
