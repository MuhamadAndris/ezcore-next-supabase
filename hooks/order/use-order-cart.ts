import CartItem from "@/components/orders/cart-item"
import { Product } from "@/schemas/product.schema"
import { CartData, CartReceipts } from "@/types/order-cart"
import { useCallback, useEffect, useState } from "react"

const useOrderCart = () => {
    const [data, setData] = useState<CartData>({
        userId: 1,
        storeSelected: {
            value: 1,
            label: "Aeon Sentul City",
        }, // note: nanti ganti dengan store yang dipilih user
        purchasedAt: new Date(),
    })

    const [receipts, setReceipts] = useState<CartReceipts[]>([
        {
            no: 1,
            saleByUser: {
                value: 1,
                label: "Muhamad Andris",
            },
            CartItems: [],
            totalQty: 0,
            subTotal: 0,
        },
    ])

    const calculateReceipt = (items: CartReceipts["CartItems"]) => ({
        totalQty: items.reduce((total, item) => total + item.qty, 0),

        subTotal: items.reduce(
            (total, item) => total + item.product.normalPrice * item.qty,
            0
        ),
    })

    const [currentReceiptNo, setCurrentReceiptNo] = useState<number>(
        receipts[0].no
    )

    const currentReceipt =
        receipts.find((r) => r.no === currentReceiptNo) || receipts[0]

    const updateStoreSelected = useCallback(
        (newStoreSelected: CartData["storeSelected"]) => {
            console.log("update store selected")
            setData((prevData) => ({
                ...prevData,
                storeSelected: newStoreSelected,
            }))
        },
        []
    )

    const updateSaleByUser = useCallback(
        (
            receiptNo: number,
            newSaleByUser: { value: number; label: string }
        ) => {
            setReceipts((prev) =>
                prev.map((receipt) =>
                    receipt.no === receiptNo
                        ? {
                              ...receipt,
                              saleByUser: newSaleByUser,
                          }
                        : receipt
                )
            )
        },
        []
    )

    const updatePurchasedAt = useCallback(
        (newPurchasedAt: CartData["purchasedAt"]) => {
            console.log("update purchased at")
            setData((prevData) => ({
                ...prevData,
                purchasedAt: newPurchasedAt,
            }))
        },
        []
    )

    const addCartReceipt = useCallback(() => {
        const newReceiptNo = Math.max(0, ...receipts.map((r) => r.no)) + 1

        setReceipts((prev) => [
            ...prev,
            {
                no: newReceiptNo,
                saleByUser: {
                    label: "Muhamad Andris",
                    value: 1,
                },
                CartItems: [],
                totalQty: 0,
                subTotal: 0,
            },
        ])

        setCurrentReceiptNo(newReceiptNo)
    }, [receipts])

    const addCartItem = useCallback(
        (newItem: Product) => {
            setReceipts((prev) =>
                prev.map((receipt) => {
                    if (receipt.no !== currentReceiptNo) return receipt

                    const existsItem = receipt.CartItems.find(
                        (item) => item.product.id === newItem.id
                    )

                    const updatedCartItems = existsItem
                        ? receipt.CartItems.map((item) =>
                              item.product.id === newItem.id
                                  ? {
                                        ...item,
                                        qty: item.qty + 1,
                                    }
                                  : item
                          )
                        : [
                              ...receipt.CartItems,
                              {
                                  qty: 1,
                                  product: newItem,
                              },
                          ]
                    return {
                        ...receipt,
                        CartItems: updatedCartItems,
                        ...calculateReceipt(updatedCartItems),
                    }
                })
            )
        },
        [currentReceiptNo]
    )

    const addQty = useCallback(
        (itemId: number) => {
            setReceipts((prev) =>
                prev.map((receipt) => {
                    if (receipt.no !== currentReceiptNo) return receipt

                    const updatedCartItem = receipt.CartItems.map((item) =>
                        item.product.id === itemId
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )

                    return {
                        ...receipt,
                        CartItems: updatedCartItem,
                        ...calculateReceipt(updatedCartItem),
                    }
                })
            )
        },
        [currentReceiptNo]
    )

    const reduceQty = useCallback(
        (itemId: number) => {
            setReceipts((prev) =>
                prev.map((receipt) => {
                    if (receipt.no !== currentReceiptNo) return receipt

                    const updatedCartItem = receipt.CartItems.map((item) =>
                        item.product.id === itemId
                            ? { ...item, qty: item.qty - 1 }
                            : item
                    ).filter((item) => item.qty > 0)

                    return {
                        ...receipt,
                        CartItems: updatedCartItem,
                        ...calculateReceipt(updatedCartItem),
                    }
                })
            )
        },
        [currentReceiptNo]
    )

    return {
        cart: {
            data,
            updateStoreSelected,
            updatePurchasedAt,
            updateSaleByUser,
            addCartReceipt,
            addCartItem,
            currentReceipt,
            setCurrentReceiptNo,
            addQty,
            reduceQty,
            receipts,
        },
    }
}

export default useOrderCart

export type UseOrderCartReturn = ReturnType<typeof useOrderCart>
