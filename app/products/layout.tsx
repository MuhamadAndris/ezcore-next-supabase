export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container p-5 mx-auto">
            {children}
        </div>
    )
}