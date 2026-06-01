
// AuthShell은 없어도 되는 컴포넌트지만 
// 역할을 좀 더 나누기 위해 만들었다.
// AuthShell이 없으면 page.tsx 내부 코드가 
// 길어질 가능성이 있기 때문이다.
export default function AuthShell ({
    mode,
    children,
}: {
    mode: "signin" | "signup",
    children: React.ReactNode,
}) {
    // Array.isArray()는 전달받은 값이 배열인지 확인
    // 여기서 typeof를 사용하게 되면 object를 반환
    // 배열은 object(객체)의 특수한 형태
    // children은 레프트 패널(이미지)과 form(로그인 혹은 회원가입)을 전달하고 있다. 
    const [left, right] = Array.isArray(children) ? children : [children, null];

    return (
        <div 
			className="
				flex
				w-[95vw] h-[95vh]
				overflow-hidden
				border-1 border-pink-200 rounded-4xl
                lg:w-[90vw] sm:h-[90vh]">
            <div 
                className={`
                    transition-[width] duration-400 ease-in-out
                    hidden
                    ${mode === "signin" ? "inline lg:w-[60%]" : "inline lg:w-[40%]"}`}>
                {left}
            </div>
            <div 
                className={`
                    transition-[width] duration-400 ease-in-out
                    w-full h-full overflow-y-auto
                    ${mode === "signin" ? "lg:w-[40%]" : "lg:w-[60%]"}`}>
                {right}
            </div>
		</div>
    );
};