'use server'
import ClientAuthLayout from "@/components/layout/clientAuthLayout";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClientAuthLayout>
            {children}
        </ClientAuthLayout>
    )
}
