import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'D.PETAL',
    description: '당신의 하루를 기록해보세요.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
