import ClientMainLayout from "@/components/layout/clientMainLayout";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClientMainLayout withSidebar={true}>
            {children}
        </ClientMainLayout>
    )
}
