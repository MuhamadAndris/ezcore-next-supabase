export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="xl:container w-full mx-auto pb-15 md:mb-0 overflow-y-auto">
            {children}
        </div>
    )
}
