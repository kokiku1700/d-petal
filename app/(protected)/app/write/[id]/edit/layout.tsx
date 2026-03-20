import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "D.PETAL - 수정",
    description: "작성한 글을 수정해보세요.",
};

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <>
            {children}
        </>
    )
}