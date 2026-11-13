import { IconMinus, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupText } from "../ui/button-group"
import Image from "next/image"
import { devLog, formatNumber } from "@/lib/utils"
import { ChangeEvent, memo, useState } from "react"
import { Product } from "@/schemas/product.schema"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "../ui/popover"
import { Input } from "../ui/input"

interface CartItemProps {
    item: {
        product: Product
        qty: number
    }
    onAddQty: (productId: number) => void
    onReduceQty: (productId: number) => void
    onUpdatedPrice: (productId: number, newPrice: number) => void
    onDeleteItem: (productId: number) => void
}

const CartItem = memo(
    ({
        item,
        onAddQty,
        onReduceQty,
        onUpdatedPrice,
        onDeleteItem,
    }: CartItemProps) => {
        const product = item.product
        const [displayValue, setDisplayValue] = useState<string>(
            formatNumber(product.normalPrice)
        )

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value

            const cleanNumber = value.replace(/\D/g, "")

            if (cleanNumber === "") {
                setDisplayValue("")
                onUpdatedPrice(product.id, 0)
                return
            }

            const numberValue = parseInt(cleanNumber, 10)
            onUpdatedPrice(product.id, numberValue)

            const formatted = formatNumber(numberValue)
            setDisplayValue(formatted)
        }

        devLog("render cart receipt item")
        return (
            <div className="flex gap-2 border rounded-md p-1">
                {/* Image */}
                <div className="flex justify-center items-center relative aspect-square w-15">
                    <Image
                        src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                        alt="dummy Image"
                        className="object-contain"
                        fill
                        sizes="60px"
                    />
                </div>

                {/* Description */}
                <div className="flex-1 flex justify-between">
                    <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                            {product.sku}
                            {product.size && ` | ${product.size}`}
                            {product.color && ` | ${product.color}`}
                        </p>
                        {item.qty > 1 && (
                            <p className="text-xs text-muted-foreground">
                                @{formatNumber(product.normalPrice)}
                            </p>
                        )}
                        <p className="text-sm">
                            <span>
                                Rp.{" "}
                                {formatNumber(product.normalPrice * item.qty)}
                            </span>
                        </p>

                        {/* Qty */}
                        <ButtonGroup className="mt-1">
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => onReduceQty(product.id)}
                            >
                                <IconMinus />
                            </Button>
                            <ButtonGroupText>{item.qty}</ButtonGroupText>
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => onAddQty(product.id)}
                            >
                                <IconPlus />
                            </Button>
                        </ButtonGroup>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col h-full justify-center">
                        <Popover>
                            <PopoverTrigger
                                render={
                                    <Button variant="ghost" size="icon-sm">
                                        <IconPencil />
                                    </Button>
                                }
                            />

                            <PopoverContent>
                                <PopoverHeader>
                                    <PopoverTitle>Ubah Harga</PopoverTitle>
                                    <PopoverDescription>
                                        Normal Rp.{" "}
                                        {formatNumber(product.normalPrice)}
                                    </PopoverDescription>
                                </PopoverHeader>
                                <Input
                                    inputMode="numeric"
                                    value={displayValue}
                                    onChange={handleChange}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button
                            variant="destructive"
                            size="icon-sm"
                            className="bg-transparent "
                            onClick={() => onDeleteItem(product.id)}
                        >
                            <IconTrash />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
)

export default CartItem
