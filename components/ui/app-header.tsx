import { ReactNode } from "@tabler/icons-react"
import BackButton from "./back-button"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
    children?: ReactNode
    title?: string
}

export default function AppHeader({ children, title }: AppHeaderProps) {
    return (
        <nav
            className="
            bg-popover py-2 px-4
            flex flex-col gap-2
            sticky top-0 z-10
            border-b
        "
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex-1 flex gap-2 items-center">
                    <BackButton />

                    {title && <h2 className="font-medium">{title}</h2>}
                </div>
                {children}
            </div>
        </nav>
    )
}

export function AppHeaderAction({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex gap-1", className)} {...props}>
            {children}
        </div>
    )
}
