export default function ProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden text-gray-800">
            {children}
        </div>
    )
}
