import { SessionUser } from "@/lib/getSessionUser"

type Props = {
    user: SessionUser | null;
};

export default function MyInfo ( { user }: Props ) {
    const myInfo = [
        { title: "이름", value: user?.user_name },
        { title: "닉네임", value: user?.user_nickname },
        { title: "이메일", value: user?.user_email },
        { title: "성별", value: user?.user_sex },
        { title: "생일", value: user?.user_birth },
    ]

    return (
        <section 
            className="
                flex flex-col
                w-[30%] p-2
                rounded-xl
                border border-gray-400
                bg-white">
            <h1 
                className="
                    pl-5 py-2 
                    text-xl font-bold 
                    border-b border-gray-300">
                내 정보
            </h1>
            <div 
                className="
                    w-[90%] mx-auto pt-2
                    flex flex-col">
                {myInfo.map((info, idx) => (
                    <div 
                        key={idx}
                        className="
                            grid grid-cols-[100px_1fr]
                            items-center gap-x-6 py-1">
                        <h6 className="text-md text-gray-500">
                            {info.title}
                        </h6>
                        <span className="text-md font-medium text-gray-900">
                            {info.value}
                        </span>   
                    </div>
                ))}  
            </div>
        </section>
    )
}