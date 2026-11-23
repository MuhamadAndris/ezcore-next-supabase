import { IconRefresh, IconSearch } from "@tabler/icons-react"
import { Button } from "./button"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"

type SearchInputProps = Omit<
    React.ComponentProps<typeof InputGroupInput>,
    "value" | "defaultValue" | "onChange" | "type" | "onBlur"
> & {
    onSearch: (keyword: string) => void | Promise<void>
    onClose?: () => void
    debounceMs?: number
    isLoading?: boolean
}

export function SearchInput({
    onClose,
    onSearch,
    isLoading,
    debounceMs = 500,
    placeholder = "Cari...",
    ...inputProps
}: SearchInputProps) {
    const [value, setValue] = useState("")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )
    const onSearchRef = useRef(onSearch)
    useEffect(() => {
        onSearchRef.current = onSearch
    })
    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value
        setValue(next)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(
            () => onSearchRef.current(next.trim()),
            debounceMs
        )
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const next = e.relatedTarget as HTMLElement | null
        if (next?.closest("[data-search-trigger]")) return
        if (value.trim()) return // masih ada keyword → jangan tutup
        onClose?.()
    }

    const showSpinner = useMinimumLoading(isLoading ?? false, 600)
    return (
        <InputGroup>
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                type="search"
                {...inputProps}
                autoFocus
                onBlur={handleBlur}
            />

            <InputGroupAddon>
                <IconSearch />
            </InputGroupAddon>
            {showSpinner && (
                <InputGroupAddon align="inline-end">
                    <IconRefresh className="animate-spin motion-reduce:animate-none" />
                </InputGroupAddon>
            )}
        </InputGroup>
    )
}

type SearchButtonProps = React.ComponentProps<typeof Button> & {
    isSearchOpen?: boolean
}

export function SearchButton({
    isSearchOpen = false,
    variant = "ghost",
    size = "icon",
    ...props
}: SearchButtonProps) {
    return (
        <Button
            variant={isSearchOpen ? "secondary" : variant}
            size={size}
            data-search-trigger
            aria-label="Cari"
            {...props}
        >
            <IconSearch />
        </Button>
    )
}

type SearchToggleProps = Pick<
    SearchInputProps,
    "onSearch" | "placeholder" | "debounceMs"
>

export function SearchToggle(props: SearchToggleProps) {
    const [show, setShow] = useState(false)

    return show ? (
        <SearchInput {...props} onClose={() => setShow(false)} />
    ) : (
        <SearchButton onClick={() => setShow(true)} />
    )
}
