import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.PETAL - 내 정보",
    description: "내 정보를 확인할 수 있습니다.",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {children}
        </>
    )
}