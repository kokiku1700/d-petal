import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.PETAL - 기록 요약",
    description: "기록한 내용을 확인해보세요.",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {
    return (
        <div>
            {children}
        </div>
    )
}