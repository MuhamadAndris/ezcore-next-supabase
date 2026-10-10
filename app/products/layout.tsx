export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="xl:container w-full mx-auto">
            {children}
        </div>
    )
}