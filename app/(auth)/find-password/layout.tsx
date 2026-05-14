import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "D.PETAL - 비밀번호 찾기",
	description: "비밀번호를 찾을 수 있습니다.",
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
