import { createClient } from "@/lib/client"
import { Field, FieldLabel } from "../ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { memo, useEffect, useRef, useState } from "react"
import { devError } from "@/lib/utils"
import { toast } from "../ui/toast"

type Items = {
    value: number
    label: string
}

interface SelectUserProps {
    userSelected: Items
    receiptNo: number
    updateUserSelected: (receiptNo: number, newUserSelected: Items) => void
}

const SelectUser = memo(
    ({ userSelected, receiptNo, updateUserSelected }: SelectUserProps) => {
        const [items, setItems] = useState<Items[]>([userSelected])
        const isFetching = useRef(false)

        useEffect(() => {
            setItems((prevItems) => {
                const alreadyExists = prevItems.some(
                    (item) => item.value === userSelected.value
                )

                if (alreadyExists) {
                    return prevItems.map((item) =>
                        item.value === userSelected.value ? userSelected : item
                    )
                }

                return [userSelected, ...prevItems]
            })
        }, [userSelected])

        const fetchUsers = async () => {
            if (isFetching.current) return
            isFetching.current = true

            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from("userStores")
                    .select("users(id, name)")
                    .eq("storeId", 1) // note: nanti ganti dengan session store id

                if (error) throw error

                const userItems: Items[] = data.flatMap((users) => {
                    const user = users.users as unknown as {
                        id: number
                        name: string
                    }
                    return {
                        value: user.id,
                        label: user.name,
                    }
                })

                setItems((prevItems) => {
                    const merged = [...prevItems, ...userItems]
                    const uniqueItems = new Map<number, Items>()

                    merged.forEach((item) => {
                        uniqueItems.set(item.value, item)
                    })

                    return Array.from(uniqueItems.values())
                })
            } catch (err) {
                devError("Gagal ambil data daftar user", err)
                toast.add({
                    type: "error",
                    title: "Gagal ambil data daftar user",
                })
            } finally {
                isFetching.current = false
            }
        }

        return (
            <Field>
                <FieldLabel htmlFor="user">Penjual</FieldLabel>
                <Select
                    items={items}
                    value={userSelected.value}
                    onOpenChange={(isOpen) => {
                        if (isOpen) fetchUsers()
                    }}
                    onValueChange={(value) => {
                        const selectedItem = items.find(
                            (item) => item.value === Number(value)
                        )

                        if (selectedItem) {
                            updateUserSelected(receiptNo, selectedItem)
                        }
                    }}
                >
                    <SelectTrigger id="user">
                        <SelectValue placeholder="Pilih penjual" />
                    </SelectTrigger>

                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={String(item.value)}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        )
    }
)

SelectUser.displayName = "SelectUser"

export default SelectUser
