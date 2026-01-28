import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "D.PETAL - Sign In",
	description: "D.PETAL에 로그인하고 당신의 하루를 기록해보세요.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
        <div 
            className="
                w-full min-h-screen
                flex justify-center items-center">
            <div 
                className="
                    w-full min-h-screen 
                    md:min-h-[90vh] md:w-[90vw]">
                {children}
            </div>
        </div>
  	);
}
