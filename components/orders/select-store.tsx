import { createClient } from "@/lib/client"
import { Field, FieldLabel } from "../ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { memo, useRef, useState } from "react"
import { devError, devLog } from "@/lib/utils"
import { toast } from "../ui/toast"

type Items = {
    value: number
    label: string
}

interface SelectStoreProps {
    storeSelected: Items
    updateStoreSelected: (newStoreSelected: Items) => void
}

const SelectStore = memo(
    ({ storeSelected, updateStoreSelected }: SelectStoreProps) => {
        devLog("render select store")
        const [items, setItems] = useState<Items[]>([storeSelected])
        const isFetching = useRef(false)

        const fetchStores = async () => {
            if (isFetching.current) return
            isFetching.current = true

            try {
                const supabase = createClient()

                const { data, error } = await supabase
                    .from("userStores")
                    .select("stores(id, name)")
                    .eq("userId", 1) // note: nanti ganti dengan session user id

                if (error) {
                    devError("Gagal ambil data daftar toko", error)
                    toast.add({
                        type: "error",
                        title: "Gagal ambil data daftar toko",
                    })
                    return
                }

                const storeItems: Items[] = data.flatMap((stores) => {
                    const store = stores.stores as unknown as {
                        id: number
                        name: string
                    }
                    return {
                        value: store.id,
                        label: store.name,
                    }
                })

                setItems(storeItems)
            } finally {
                isFetching.current = false
            }
        }

        return (
            <Field>
                <FieldLabel htmlFor="store">Toko</FieldLabel>
                <Select
                    onOpenChange={(onOpen) => {
                        if (onOpen) fetchStores()
                    }}
                    items={items}
                    value={storeSelected.value}
                    onValueChange={(value) => {
                        const selectedItem = items.find(
                            (item) => item.value === Number(value)
                        )

                        if (selectedItem && updateStoreSelected) {
                            updateStoreSelected(selectedItem)
                        }
                    }}
                >
                    <SelectTrigger id="store">
                        <SelectValue placeholder="Pilih toko" />
                    </SelectTrigger>

                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        )
    }
)

SelectStore.displayName = "SelectStore"

export default SelectStore
