import Image from "next/image"
import signInLeftImg from "@/public/signInLeftImg.jpg";

type Props = {
    mode: string;
};

export default function LeftPanel ({mode}: Props) {

    return (
        <div className="relative w-full h-screen md:h-[90vh]">
            <Image 
                src={signInLeftImg}
                alt="로그인 왼 쪽 이미지"
                fill
                className="object-cover"
                priority />
            <div className="absolute bottom-65 right-50 text-white/90 text-shadow-lg">
                <h1 className="text-2xl mb-3">
                    D.PETAL
                </h1>
                <p>
                    "당신의 하루를 기록해보세요."
                </p>
            </div>	
        </div>
    );
};