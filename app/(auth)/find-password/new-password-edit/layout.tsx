import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "D.PETAL - 비밀번호 변경",
	description: "인증 완료 후 새 비밀번호로 변경합니다.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
        <div>
            {children}
        </div>
  	);
}