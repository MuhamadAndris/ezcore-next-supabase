import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "../ui/button";

export default function FormPriceProduct() {
    return (
        <FieldGroup className="border p-6 rounded-md">
            <FieldSet>
                <FieldLegend className="font-semibold text-[24px]!">Harga</FieldLegend>
                <FieldSeparator />
                <FieldGroup className="md:flex-row">
                    <Field>
                        <FieldLabel className="text-[12px] font-semibold">HARGA NORMAL *</FieldLabel>
                        <Input className="text-[14px]" type="number" placeholder="HARGA" required />
                    </Field>
                    <Field>
                        <FieldLabel className="text-[12px] font-semibold">HARGA PROMO</FieldLabel>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <Button className="justify-between" variant="outline">
                                    Tidak ada promo 
                                    <IconChevronDown />
                                </Button>
                            } />    
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Promo 1</DropdownMenuItem>
                                    <DropdownMenuItem>Promo 2</DropdownMenuItem>
                                    <DropdownMenuItem>Promo 3</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Field>
                    <Field>
                        <FieldLabel className="text-[12px] font-semibold">HARGA SETELAH PROMO</FieldLabel>
                        <Input className="text-[14px]" type="number" placeholder="HARGA SETELAH PROMO" />
                    </Field>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}