import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Popover, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { IconChevronDown } from "@tabler/icons-react";

type Store = {
    value: string
    label: string
}

export default function CartContent() {
    const stores:Store[] = [
        {
            value: "0E1",
            label: "AEON SENTUL"
        },
        {
            value: "0E3",
            label: "AEON BSD"
        }
    ]

    const [ date, setDate ] = useState<Date>()

    return (
        <Card className="w-80 h-screen sticky top-0">
            <CardHeader>
                <CardTitle>Cart</CardTitle>
                <CardDescription>ID: #ORD-0042</CardDescription>
            </CardHeader>

            <Separator />

            <div className="flex-1 overflow-auto px-3">

                {/* Pilih toko */}
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="store">TOKO</FieldLabel>
                        <Select id="store" items={stores} defaultValue="0E1">
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih toko" />
                            </SelectTrigger>

                            <SelectContent>
                                {stores.map((store) => (
                                    <SelectItem
                                        key={store.value}
                                        value={store.value}
                                    >
                                        {store.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>

                {/* Pilih tanggal */}
                <Popover>
                    <PopoverTrigger render={
                        <Button variant={"outline"} data-empty={!date} className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
                            {date ? format(date, "PPP") : <span>Pick a date</span>}<IconChevronDown data-icon="inline-end" />
                        </Button>
                    } />
                </Popover>
            </div>

            <CardFooter className="flex justify-end gap-3">
                <Button variant="secondary">Batal</Button>
                <Button>Simpan</Button>
            </CardFooter>
        </Card>
    )
}