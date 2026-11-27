interface Props {
    params: Promise<{
        orderId: string
    }>
}

export default async function OrderDetail({ params }: Props) {
    const { orderId } = await params

    return <h1>Order Id yang di terima: {orderId}</h1>
}
