import { Product } from "@/schemas/product.schema"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import Image from "next/image"
import { formatNumber } from "@/lib/utils"
import { memo } from "react"
import {
    IconShoppingCartCheck,
    IconShoppingCartPlus,
} from "@tabler/icons-react"
import { useMessage } from "@/contexts/message-context"

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
}

const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
    const { showMessage } = useMessage()
    const handleClick = () => {
        onAddToCart(product)
        showMessage("Dimasukan ke keranjang", IconShoppingCartCheck)
    }
    return (
        <Card className="pt-0">
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
                    onClick={handleClick}
                >
                    <IconShoppingCartPlus />
                    Pilih
                </Button>
            </CardFooter>
        </Card>
    )
})

ProductCard.displayName = "ProductCard"

export default ProductCard
