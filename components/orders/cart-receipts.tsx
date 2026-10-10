import { IconPlus, IconCloudUpload } from "@tabler/icons-react";
import { ButtonGroup } from "../ui/button-group";
import { Field, FieldLabel } from "../ui/field";
import CartItem from "./cart-item";
import { Button } from "../ui/button";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

type User = {
    value: number
    label: string
}

const users:User[] = [
    {
        "value": 1,
        "label": "Muhamad Andris"
    },
    {
        "value": 2,
        "label": "Muhamad Alfarijal"
    },
]

export default function CartReceipts() {
    const [ saleByUserId, setSaleByUserId ] = useState()
    return (
        <>
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

            {/* Sale by user */}
            <Field>
                <FieldLabel>Penjual</FieldLabel>
                <Select items={users}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih penjual" />
                    </SelectTrigger>

                    <SelectContent>
                        {users.map((u) => 
                            <SelectItem key={u.value} value={u.value}>
                                {u.label}
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
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

                {/* Sub total */}
                <p className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>500.000/4 pcs</span>
                </p>
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
        </>
    )
}