import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import z from "zod"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatNumber(value: number): string {
    return value.toLocaleString("id-ID")
}

export function formatDate(date: Date, newFormat: string = "PPP"): string {
    return format(date, newFormat, {
        locale: id,
    })
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function devLog(...args: unknown[]) {
    if (process.env.NODE_ENV === "development") {
        console.log(...args)
    }
}

export function devError(...args: unknown[]) {
    if (process.env.NODE_ENV !== "development") return

    for (const arg of args) {
        if (arg instanceof z.ZodError) {
            console.log("Error form ZOD")
            console.table(
                arg.issues.map((issue) => ({
                    field: issue.path.join(".") || "(root)",
                    message: issue.message,
                    code: issue.code,
                }))
            )
        } else {
            console.error(arg)
        }
    }
}
