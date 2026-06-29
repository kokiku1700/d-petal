import Image from "next/image";
import refresh from "@/public/refresh.png";

type Props = {
    onClick: () => void;
};

export default function Refresh ({ onClick }: Props) {

    return (
        <button
            onClick={onClick} 
            className="
                relative w-8 h-8
                rounded-lg
                border border-gray-300 
                cursor-pointer">
            <Image src={refresh} alt="새로고침" fill/>
        </button>
    )
}