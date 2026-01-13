export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-gray-800">
            {children}
        </div>
    )
}
