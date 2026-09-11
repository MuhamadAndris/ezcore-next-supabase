import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { Textarea } from "../ui/textarea";

export default function FormBaseProduct() {
    return (
        <FieldGroup className="border p-4 md:p-6 rounded-md">
            <FieldSet>
                <FieldLegend className="font-semibold text-sm md:text-[24px]!">Informasi Dasar</FieldLegend>
                <FieldSeparator />
                <FieldGroup>
                    <Field>
                        <FieldLabel className="text-xs font-semibold">NAMA PRODUK *</FieldLabel>
                        <Input className="text-xs md:text-[14px]" type="text" placeholder="Nama Produk" required />
                    </Field>
                    <FieldGroup className="flex-row">
                        <Field>
                            <FieldLabel className="text-xs font-semibold">SKU *</FieldLabel>
                            <Input className="text-xs md:text-[14px]" type="text" placeholder="SKU" required />
                        </Field>
                        <Field>
                            <FieldLabel className="text-xs md:text-[14px] font-semibold">BRAND *</FieldLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="text-xs md:text-[14px]"
                                    render={
                                        <Button
                                            className="justify-between"
                                            variant="outline"
                                        >
                                            Pilih Brand
                                            <IconChevronDown />
                                        </Button>
                                    }
                                />
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="text-xs md:text-[14px]">Brand 1</DropdownMenuItem>
                                        <DropdownMenuItem className="text-xs md:text-[14px]">Brand 2</DropdownMenuItem>
                                        <DropdownMenuItem className="text-xs md:text-[14px]">Brand 3</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>         
                        </Field>
                    </FieldGroup>
                    <Field>
                        <FieldLabel className="text-xs md:text-[14px] font-semibold">DESKRIPSI </FieldLabel>
                        <Textarea className="text-xs md:text-[14px]" placeholder="DESKRIPSI    " />
                    </Field>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}