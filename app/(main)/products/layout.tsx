export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="xl:container w-full mx-auto pb-15 md:pb-0 overflow-y-auto">
            {children}
        </div>
    )
}
