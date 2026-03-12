import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.PETAL - 기록 차트",
    description: "기록한 내용을 차트로 확인해보세요.",
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