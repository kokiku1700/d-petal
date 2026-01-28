import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "D.PETAL",
	description: "D.PETAL에서 당신의 하루를 기록해보세요.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
		<html lang="ko">
			<body> 
				{children}
			</body>
		</html>
  	);
}
