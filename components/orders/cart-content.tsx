import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { IconChevronDown, IconCloudUpload, IconPlus, IconUpload, IconX } from "@tabler/icons-react";
import { Calendar } from "../ui/calendar";
import { id as idLocale } from "date-fns/locale"
import CartItem from "./cart-item";
import Image from "next/image";
import { ButtonGroup } from "../ui/button-group";
import { cn } from "@/lib/utils";

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

interface CartContentProps {
    closeCart: (v:boolean) => void
}

export default function CartContent({
    closeCart
}:CartContentProps) {
    const [ store, setStore ] = useState<string | null>("0E1")
    const [ date, setDate ] = useState<Date>()
    const [ showCalender, setShowCalender ] = useState(false)

    return (
        <Card className={cn(
            "md:relative md:w-80 md:h-full md:grid md:grid-rows-[auto_1fr_auto]",
            "fixed top-0 right-0 w-full h-full"
        )}>
            {/* Header */}
            <CardHeader className="sticky top-0">
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

            <FieldGroup className="overflow-y-auto px-3">
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
                <Field className="sticky top-0 bg-background z-10 pb-3">
                    <FieldLabel>
                        <span>Bon aktif</span>
                    </FieldLabel>
                    <ButtonGroup className="w-full overflow-x-scroll">
                        <Button>107655</Button>
                        <Button variant="outline">107656</Button>
                        <Button variant="outline">107657</Button>
                        <Button variant="outline">107658</Button>
                        <Button variant="outline">107659</Button>
                        <Button variant="outline">
                            <IconPlus />
                        </Button>
                    </ButtonGroup>
                </Field>

                {/* Items */}
                <Field>
                    <FieldLabel>Daftar produk</FieldLabel>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </Field>

                {/* Payment proof */}
                <Field>
                    <FieldLabel>Bukti pembayaran</FieldLabel>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="
                                text-muted-foreground
                                flex-1 flex flex-col justify-center items-center
                                border-3 border-dotted hover:border-foreground/60
                                h-full p-1 rounded-lg cursor-pointer
                            ">
                            <IconCloudUpload />
                            Upload foto Struk
                        </Button>
                        <div className="relative bg-yellow-300 aspect-square h-15">
                                <Image
                                src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg" 
                                alt="dummy Image"
                                className="object-contain"
                                fill
                                sizes="60px"
                            />
                        </div>
                    </div>
                </Field>

                {/* Sub-total */}
                <Field>
                    <FieldLabel>Sub total</FieldLabel>
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

            <CardFooter className="flex justify-between gap-3">
                <p className="font-bold text-lg">500.000</p>
                <Button>Simpan</Button>
            </CardFooter>
        </Card>
    )
}