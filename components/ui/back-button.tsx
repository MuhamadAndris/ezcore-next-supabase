import { IconChevronLeft } from "@tabler/icons-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()
    return (
        <Button variant="ghost" onClick={() => router.back()} size="icon-lg">
            <IconChevronLeft />
        </Button>
    )
}
