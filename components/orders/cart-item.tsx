import { IconMinus, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupText } from "../ui/button-group"
import Image from "next/image"
import { CartReceiptItem } from "@/schemas/cart.schema"
import { devLog, formatNumber } from "@/lib/utils"
import { memo } from "react"

interface CartItemProps {
    item: CartReceiptItem
}

const CartItem = memo(({ item }: CartItemProps) => {
    const product = item.products
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
                    <p className="text-sm">
                        Rp. {formatNumber(product.normalPrice)}
                    </p>

                    {/* Qty */}
                    <ButtonGroup>
                        <Button variant="outline" size="icon-xs">
                            <IconMinus />
                        </Button>
                        <ButtonGroupText>{item.qty}</ButtonGroupText>
                        <Button variant="outline" size="icon-xs">
                            <IconPlus />
                        </Button>
                    </ButtonGroup>
                </div>

                {/* Action */}
                <div className="flex flex-col h-full justify-center">
                    <Button variant="ghost" size="icon-sm">
                        <IconPencil />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon-sm"
                        className="bg-transparent"
                    >
                        <IconTrash />
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default CartItem
