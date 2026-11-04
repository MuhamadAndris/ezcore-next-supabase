import { Product } from "@/schemas/product.schema"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { formatNumber } from "@/lib/utils"
import { memo } from "react"
import { IconShoppingCartPlus } from "@tabler/icons-react"

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
}

const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
    return (
        <Card>
            <div className="relative w-full">
                <Image
                    src="https://s1.lojelcdn.com/wp-content/uploads/2017/11/Lojel-Voja-WarmGray-Front-Small.jpg"
                    alt="dummy Image"
                    className="object-contain mx-auto"
                    height={500}
                    width={500}
                />
            </div>
            <CardHeader>
                <CardTitle className="truncate">{product.name}</CardTitle>
                <CardDescription className="truncate">
                    {product.sku}
                    {product.size && ` | ${product.size}`}
                    {product.color && ` | ${product.color}`}
                </CardDescription>
                <CardTitle>Rp {formatNumber(product.normalPrice)}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button
                    className="w-full cursor-pointer"
                    variant="default"
                    onClick={() => onAddToCart(product)}
                >
                    <IconShoppingCartPlus />
                    Pilih
                </Button>
            </CardFooter>
        </Card>
    )
})

export default ProductCard
