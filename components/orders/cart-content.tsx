import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { IconChevronDown } from "@tabler/icons-react";
import { Calendar } from "../ui/calendar";
import { id as idLocale } from "date-fns/locale"

type Store = {
    value: string
    label: string
}

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

export default function CartContent() {
    const [ store, setStore ] = useState<string | null>("0E1")
    const [ date, setDate ] = useState<Date>()
    const [ showCalender, setShowCalender ] = useState(false)

    console.log({
        store: store,
        date: date
    })

    return (
        <Card className="w-80 h-screen sticky top-0 flex flex-col">
            <CardHeader>
                <CardTitle>Cart</CardTitle>
                <CardDescription>ID: #ORD-0042</CardDescription>
            </CardHeader>

            <Separator />

            <div className="flex-1 overflow-auto px-3 space-y-3">

                {/* Pilih toko */}
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="store">TOKO</FieldLabel>
                        <Select items={stores} value={store} onValueChange={(v) => setStore(v)}>
                            <SelectTrigger id="store">
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
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="date">TANGGAL</FieldLabel>
                        <Popover open={showCalender} onOpenChange={setShowCalender}>
                            <PopoverTrigger id="date" render={
                                <Button 
                                    variant={"outline"}
                                    data-empty={!date}
                                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {date
                                        ? format(date, "PPP", { locale: idLocale })
                                        : <span>Pick a date</span>}<IconChevronDown data-icon="inline-end" />
                                </Button>
                            } />
                            <PopoverContent  className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(v) => {
                                        setDate(v)
                                        setShowCalender(false)
                                    }}
                                    defaultMonth={date}
                                    locale={idLocale}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                </FieldGroup>
                
            </div>

            <CardFooter className="flex justify-end gap-3">
                <Button variant="secondary">Batal</Button>
                <Button>Simpan</Button>
            </CardFooter>
        </Card>
    )
}