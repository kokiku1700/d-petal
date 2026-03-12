import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.PETAL - 기록 중",
    description: "여러분의 하루를 기록해보세요.",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {
    return (
        <>
            {children}
        </>
    )
}