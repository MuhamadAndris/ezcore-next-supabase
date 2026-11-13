import { toast } from "@/components/ui/toast"
import { createClient } from "@/lib/client"
import { devError } from "@/lib/utils"
import { Product } from "@/schemas/product.schema"
import { CartData, CartReceipts } from "@/types/order-cart"
import { useCallback, useMemo, useRef, useState } from "react"

const defaultReceipts: CartReceipts[] = [
    {
        no: 1,
        saleByUser: {
            value: 1,
            label: "Muhamad Andris",
        },
        CartItems: [],
        paymentProof: null,
        totalQty: 0,
        subTotal: 0,
    },
]

const useOrderCart = () => {
    const isLoading = useRef(false)

    const [storeSelected, setStoreSelected] = useState<
        CartData["storeSelected"]
    >({
        value: 1,
        label: "Aeon Sentul City",
    })

    const [purchasedAt, setPurchasedAt] = useState<Date>(new Date())

    const [receipts, setReceipts] = useState<CartReceipts[]>(defaultReceipts)

    const [currentReceiptNo, setCurrentReceiptNo] = useState<number>(1)

    const data: CartData = useMemo(
        () => ({
            userId: 1,
            storeSelected,
            purchasedAt,
            grandTotal: receipts.reduce((acc, r) => acc + r.subTotal, 0),
            totalQty: receipts.reduce((acc, r) => acc + r.totalQty, 0),
        }),
        [storeSelected, purchasedAt, receipts]
    )

    const isHaveItems = receipts.some((receipt) => receipt.CartItems.length > 0)

    const handleSubmit = useCallback(async () => {
        if (isLoading.current) return

        const supabse = createClient()

        const toastId = toast.add({
            type: "loading",
            title: "Menyimpan transaksi...",
            timeout: Infinity,
        })

        try {
            isLoading.current = true
            for (const receipt of receipts) {
                if (receipt.CartItems.length < 1) continue

                const file = receipt.paymentProof
                let filePath = ""
                if (file) {
                    const fileExt = file.name.split(".").pop()
                    const fileName = `${crypto.randomUUID()}.${fileExt}`
                    const { data, error: proofError } = await supabse.storage
                        .from("paymentProofs")
                        .upload(fileName, file)

                    if (proofError) throw proofError

                    filePath = data.path
                }

                const { data: order, error: OrderError } = await supabse
                    .from("orders")
                    .insert({
                        saleByUserId: receipt.saleByUser.value,
                        paymentProof: filePath,
                        totalQty: receipt.totalQty,
                        subTotal: receipt.subTotal,
                        purchasedAt: purchasedAt,
                    })
                    .select()
                    .single()

                if (OrderError) throw OrderError

                const orderItems = receipt.CartItems.map((item) => {
                    const { id, ...product } = item.product

                    return {
                        orderId: order.id,
                        productId: id,
                        qty: item.qty,
                        ...product,
                    }
                })

                const { error: itemError } = await supabse
                    .from("orderItems")
                    .insert(orderItems)

                if (itemError) throw itemError
            }

            setReceipts(defaultReceipts)

            toast.update(toastId, {
                title: "Berhasil",
                description: "Transaksi berhasil disimpan.",
                type: "success",
                timeout: 2000,
            })
        } catch (err) {
            devError(err)
            toast.update(toastId, {
                title: "Gagal",
                description: "Terjadi kesalahan saat menyimpan transaksi.",
                type: "error",
                timeout: 3000,
            })
        } finally {
            isLoading.current = false
        }
    }, [receipts, defaultReceipts])

    const currentReceipt = useMemo(
        () => receipts.find((r) => r.no === currentReceiptNo) || receipts[0],
        [receipts, currentReceiptNo]
    )

    const calculateReceipt = (items: CartReceipts["CartItems"]) => ({
        totalQty: items.reduce((total, item) => total + item.qty, 0),
        subTotal: items.reduce(
            (total, item) => total + item.product.normalPrice * item.qty,
            0
        ),
    })

    const updateStoreSelected = useCallback(
        (newStoreSelected: CartData["storeSelected"]) => {
            setStoreSelected(newStoreSelected)
        },
        []
    )

    const updatePurchasedAt = useCallback(
        (newPurchasedAt: CartData["purchasedAt"]) => {
            setPurchasedAt(newPurchasedAt)
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
                        ? { ...receipt, saleByUser: newSaleByUser }
                        : receipt
                )
            )
        },
        []
    )

    const addCartReceipt = useCallback(() => {
        const { no, ...defaultReceipt } = defaultReceipts[0]
        setReceipts((prev) => {
            const newReceiptNo = Math.max(0, ...prev.map((r) => r.no)) + 1
            setCurrentReceiptNo(newReceiptNo)
            return [
                ...prev,
                {
                    no: newReceiptNo,
                    ...defaultReceipt,
                },
            ]
        })
    }, [defaultReceipts])

    const addPaymentProof = useCallback(
        (proof: File | null) => {
            setReceipts((prev) =>
                prev.map((receipt) =>
                    receipt.no === currentReceiptNo
                        ? {
                              ...receipt,
                              paymentProof: proof,
                          }
                        : receipt
                )
            )
        },
        [currentReceiptNo]
    )

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
                                  ? { ...item, qty: item.qty + 1 }
                                  : item
                          )
                        : [...receipt.CartItems, { qty: 1, product: newItem }]

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

    const updateItemPrice = useCallback(
        (itemId: number, newPrice: number) => {
            setReceipts((prev) =>
                prev.map((receipt) => {
                    if (receipt.no !== currentReceiptNo) return receipt

                    const updatedCartItem = receipt.CartItems.map((item) =>
                        item.product.id === itemId
                            ? {
                                  ...item,
                                  product: {
                                      ...item.product,
                                      normalPrice: newPrice,
                                  },
                              }
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

    const deleteItem = useCallback(
        (itemId: number) => {
            setReceipts((prev) =>
                prev.map((receipt) => {
                    if (receipt.no !== currentReceiptNo) return receipt

                    const updatedCartItem = receipt.CartItems.filter(
                        (item) => item.product.id !== itemId
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

    return {
        cart: {
            data,
            currentReceipt,
            receipts,
            saveOrder: handleSubmit,
            addPaymentProof,
            deleteItem,
            updateItemPrice,
            updateStoreSelected,
            updatePurchasedAt,
            updateSaleByUser,
            addCartReceipt,
            addCartItem,
            setCurrentReceiptNo,
            addQty,
            reduceQty,
            isHaveItems,
        },
    }
}

export default useOrderCart
export type UseOrderCartReturn = ReturnType<typeof useOrderCart>
