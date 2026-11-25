"use client"

import { IconChecks, TablerIcon } from "@tabler/icons-react"
import {
    createContext,
    useContext,
    useState,
    useRef,
    ReactNode,
    useEffect,
} from "react"

interface MessageContextType {
    message: string
    showMessage: (text: string, icon?: TablerIcon, duration?: number) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState("")
    const [Icon, setIcon] = useState<TablerIcon>(() => IconChecks)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showMessage = (
        text: string,
        icon: TablerIcon = IconChecks,
        duration: number = 1000
    ) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setMessage(text)
        setIcon(() => icon)

        timeoutRef.current = setTimeout(() => {
            setMessage("")
            timeoutRef.current = null
        }, duration)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <MessageContext.Provider value={{ message, showMessage }}>
            {children}

            {message && (
                <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 z-100 border">
                    <div className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background shadow-lg">
                        <Icon className="size-4" />
                        {message}
                    </div>
                </div>
            )}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error("useMessage must be used within MessageProvider")
    }

    return context
}
