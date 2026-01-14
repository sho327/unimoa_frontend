import ClientMainLayout from "@/components/layout/clientMainLayout";

export default function ProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClientMainLayout withSidebar={false}>
            {children}
        </ClientMainLayout>
    )
}
