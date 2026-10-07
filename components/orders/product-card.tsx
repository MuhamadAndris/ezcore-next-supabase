import { Product } from "@/schemas/product.schema";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatNumber } from "@/lib/utils";
import { memo } from "react";

interface ProductCardProps {
    product: Product
}

const ProductCard = memo(({
    product
}:ProductCardProps) => {
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
                <CardTitle className="truncate">
                    {product.name}
                    {product.size && ` ${product.size}` }
                    {product.color && ` ${product.color}` }
                </CardTitle>
                <CardDescription>
                    {product.sku}
                    {product.size && ` | ${product.size}` }
                    {product.color && ` | ${product.color}` }
                </CardDescription>
                <CardTitle>Rp {formatNumber(product.normal_price)}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">Pesan</Button>
            </CardFooter>
        </Card>
    )
})

export default ProductCard