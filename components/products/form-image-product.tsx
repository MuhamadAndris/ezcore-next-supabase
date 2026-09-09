import { IconCameraPlus } from "@tabler/icons-react";
import { FieldGroup, FieldLegend, FieldSet } from "../ui/field";
import Image from "next/image";

export default function FormImageProduct() {
    return (
        <FieldGroup className="border p-6 rounded-md">
            <FieldSet>
                <FieldLegend className="font-semibold text-[24px]!">Media</FieldLegend>

                <div className="
                    flex gap-5
                    flex-col
                    md:flex-row
                ">

                    {/* preview */}
                    <div className="
                        relative
                        aspect-square
                        p-1 border
                        rounded-md
                        w-full
                        md:w-125
                    ">
                        <Image
                            src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                            alt="Preview"
                            sizes="500px"
                            fill
                            className="object-contain"
                        />
                    </div>
                    
                    <div className="flex-1 flex flex-col ">

                        {/* thumbnails */}
                        <div className="
                            grid gap-2 content-start
                            grid-cols-[repeat(auto-fit,minmax(100px,1fr))]
                        ">
                            <div className="
                                w-26.75
                                border aspect-square
                                relative
                                rounded-md
                                cursor-pointer
                                overflow-hidden
                                after:absolute after:inset-0 after:bg-black/10 after:opacity-0 hover:after:opacity-100
                            ">
                                <Image
                                    src="https://dynamic.zacdn.com/AuBaktBQsjcaJfWhwZgWjVybCOo=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/lojel-8584-0519232-1.jpg"
                                    alt="Preview"
                                    sizes="100px"
                                    className="object-contain"
                                    fill
                                />
                            </div>
                        </div>

                        {/* upload image */}
                        <div className="
                            w-full h-full
                            flex flex-col justify-center items-center
                            bg-[#F6F3F2]
                            mt-2 p-4
                            border border-dashed
                            rounded-md
                            cursor-pointer
                            relative
                            after:absolute after:inset-0 after:bg-black/5 after:opacity-0 hover:after:opacity-100
                        ">
                            <IconCameraPlus className="text-foreground/80" />
                            <p className="text-center text-[14px] font-semibold">
                                <span className="text-primary">Klik untuk unggah </span>
                                <span className="text-foreground/80">atau seret gambar ke sini</span>
                            </p>
                            <span className="text-center text-[12px] text-muted-foreground">
                                Format: JPG, PNG, WEBP (Maks 5MB)
                            </span>
                        </div>
                    </div>
                </div>
            </FieldSet>
        </FieldGroup>
    )
}