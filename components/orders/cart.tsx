import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { IconChevronDown, IconCloudUpload, IconPlus, IconUpload, IconX } from "@tabler/icons-react";
import { Calendar } from "../ui/calendar";
import { id as idLocale } from "date-fns/locale"
import { cn } from "@/lib/utils";
import CartReceipts from "./cart-receipts";

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

interface CartProps {
    closeCart: (v:boolean) => void
}

const Cart = memo(({
    closeCart
}:CartProps) => {

    const [ store, setStore ] = useState<string | null>("0E1")
    const [ date, setDate ] = useState<Date>()
    const [ showCalender, setShowCalender ] = useState(false)
    console.log("render cart")
    
    return (
        <Card className={cn(
            "lg:relative",
            "lg:w-80 lg:h-full",
            "lg:grid lg:grid-rows-[1fr_auto]",
            "fixed top-0 right-0 w-full h-full z-11"
        )}>
            <div className="overflow-y-auto ">
                <CardHeader className="sticky top-0 bg-background pb-3">
                    <CardTitle>Pesanan</CardTitle>
                    <CardDescription>ID: #ORD-0042</CardDescription>
                    <CardAction>
                        <Button variant="ghost" className="rounded-full" onClick={
                            () => closeCart(false)
                        }>
                            <IconX />
                        </Button>
                    </CardAction>
                </CardHeader>

                <FieldGroup className="px-3">
                    {/* Select Store */}
                    <Field>
                        <FieldLabel htmlFor="store">Toko</FieldLabel>
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
                    
                    {/* Select Date */}
                    <Field>
                        <FieldLabel htmlFor="date">Tanggal</FieldLabel>
                        <Popover open={showCalender} onOpenChange={setShowCalender}>
                            <PopoverTrigger id="date" render={
                                <Button 
                                    variant={"outline"}
                                    data-empty={!date}
                                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {date
                                        ? format(date, "PPP", { locale: idLocale })
                                        : <span>Pilih tanggal</span>}<IconChevronDown data-icon="inline-end" />
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

                    {/* Receipt */}
                    <CartReceipts />

                    {/* Sub-total */}
                    <Field>
                        <FieldLabel>Detail</FieldLabel>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                            <span>107655</span>
                            <span>100.000</span>
                        </p>
                    </Field>
                </FieldGroup>
            </div>

            <CardFooter className="flex justify-between gap-3">
                <p className="font-bold text-lg">500.000</p>
                <div className="space-x-2">
                    <Button
                        variant="ghost"
                        onClick={() => closeCart(false)}
                    >Batal</Button>
                    <Button>Simpan</Button>
                </div>
            </CardFooter>
        </Card>
    )
})

export default Cart