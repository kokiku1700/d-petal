

export default function AuthShell ({
    mode,
    children,
}: {
    mode: "signin" | "signup",
    children: React.ReactNode,
}) {
    const [left, right] = Array.isArray(children) ? children : [children, null];

    return (
        <div 
			className="
				flex
				w-full h-screen 
				overflow-hidden
				border-1 border-pink-200 rounded-4xl 
				shadow-lg shadow-pink-200
				md:h-[90vh]">
            <div 
                className={`
                    transition-[width] duration-400 ease-in-out
                    ${mode === "signin" ? "w-[60%]" : "w-[40%]"}`}>
                {left}
            </div>
            <div 
                className={`
                    transition-[width] duration-400 ease-in-out
                    ${mode === "signin" ? "w-[40%]" : "w-[60%]"}`}>
                {right}
            </div>
		</div>
    )
}